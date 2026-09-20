// Hybrid Cloud Database Client
// Offline-first architecture: fast localStorage caching + seamless automatic cloud sync.

class CloudDatabaseService {
  constructor() {
    this.defaultUrl = 'http://localhost:5000';
    this.apiUrl = this.getSavedApiUrl() || this.defaultUrl;
    this.isConnected = false;
    this.listeners = new Set();
    this.pollInterval = null;
    this.init();
  }

  getSavedApiUrl() {
    try {
      return localStorage.getItem('vertex_cloud_db_url') || '';
    } catch {
      return '';
    }
  }

  setCustomApiUrl(url) {
    try {
      const cleanUrl = url.trim().replace(/\/+$/, '');
      if (cleanUrl) {
        localStorage.setItem('vertex_cloud_db_url', cleanUrl);
        this.apiUrl = cleanUrl;
      } else {
        localStorage.removeItem('vertex_cloud_db_url');
        this.apiUrl = this.defaultUrl;
      }
      return this.checkConnection();
    } catch {
      return Promise.resolve(false);
    }
  }

  async checkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.apiUrl}/api/status`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json();
      this.isConnected = data && data.status === 'online';
      this.notify();
      return this.isConnected;
    } catch (err) {
      this.isConnected = false;
      this.notify();
      return false;
    }
  }

  init() {
    this.checkConnection();
    // Start background auto-sync polling every 12 seconds
    if (typeof window !== 'undefined') {
      this.pollInterval = setInterval(() => {
        if (!document.hidden) {
          this.syncFromCloud();
        }
      }, 12000);
    }
  }

  // Sync latest records and events from cloud database
  async syncFromCloud() {
    try {
      const isOnline = await this.checkConnection();
      if (!isOnline) return false;

      // 1. Fetch cloud records
      const recRes = await fetch(`${this.apiUrl}/api/records`);
      const recData = await recRes.json();
      if (recData && recData.records) {
        const localRecords = this.getLocalRecords();
        // Merge without duplicates based on id
        const merged = [...recData.records];
        for (const local of localRecords) {
          if (!merged.some((r) => r.id === local.id)) {
            merged.push(local);
            // Push un-synced local record to cloud
            fetch(`${this.apiUrl}/api/records`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(local),
            }).catch(() => {});
          }
        }
        localStorage.setItem('vertex_service_records', JSON.stringify(merged));
      }

      // 2. Fetch cloud events
      const evtRes = await fetch(`${this.apiUrl}/api/events`);
      const evtData = await evtRes.json();
      if (evtData && evtData.events && evtData.events.length > 0) {
        localStorage.setItem('vertex_events_list', JSON.stringify(evtData.events));
      }

      // 3. Fetch visits
      const visRes = await fetch(`${this.apiUrl}/api/visits`);
      const visData = await visRes.json();
      if (visData && typeof visData.visits === 'number') {
        const localVisits = parseInt(localStorage.getItem('vertex_site_visits') || '0', 10);
        const maxVisits = Math.max(localVisits, visData.visits);
        localStorage.setItem('vertex_site_visits', maxVisits.toString());
      }

      // Dispatch event to notify React components to update
      window.dispatchEvent(new Event('vertex_data_synced'));
      return true;
    } catch (err) {
      return false;
    }
  }

  // --- Records Methods ---
  getLocalRecords() {
    try {
      const saved = localStorage.getItem('vertex_service_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  async getRecords() {
    // Return instant local cache
    const cached = this.getLocalRecords();
    // Fire background sync
    this.syncFromCloud().catch(() => {});
    return cached;
  }

  async addRecord(record) {
    // 1. Save to local storage immediately
    const local = this.getLocalRecords();
    const updated = [record, ...local];
    localStorage.setItem('vertex_service_records', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));

    // 2. Push to cloud database if connected
    try {
      if (this.isConnected) {
        await fetch(`${this.apiUrl}/api/records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
      }
    } catch (err) {
      console.warn('Record saved locally; cloud sync pending:', err);
    }
    return record;
  }

  // --- Events Methods ---
  getLocalEvents() {
    try {
      const saved = localStorage.getItem('vertex_events_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  async getEvents() {
    const cached = this.getLocalEvents();
    this.syncFromCloud().catch(() => {});
    return cached;
  }

  async saveEvents(eventsList) {
    // Save to local storage
    localStorage.setItem('vertex_events_list', JSON.stringify(eventsList));
    window.dispatchEvent(new Event('storage'));

    // Push to cloud
    try {
      if (this.isConnected) {
        await fetch(`${this.apiUrl}/api/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventsList),
        });
      }
    } catch (err) {
      console.warn('Events saved locally; cloud sync pending:', err);
    }
    return eventsList;
  }

  // --- Visits Methods ---
  async incrementVisits() {
    const local = parseInt(localStorage.getItem('vertex_site_visits') || '142', 10) + 1;
    localStorage.setItem('vertex_site_visits', local.toString());

    try {
      if (this.isConnected) {
        await fetch(`${this.apiUrl}/api/visits`, { method: 'POST' });
      }
    } catch (err) {
      // Ignored
    }
    return local;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        isConnected: this.isConnected,
        apiUrl: this.apiUrl,
      });
    }
  }
}

export const cloudDb = new CloudDatabaseService();
