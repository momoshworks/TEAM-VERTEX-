// Background Ambient Music Controller
// Plays the uploaded track at low, pleasant volume (~0.18)
// Loops ONLY the first 60 seconds (1 minute), then restarts smoothly.
// Can be toggled on/off by the user at any time.

class AmbientAudioController {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.enabled = true; // User preference
    this.volume = 0.18; // Low but clearly audible
    this.maxDuration = 60; // Play ONLY the first minute (60s)
    this.initialized = false;
    this.listeners = new Set();
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      this.audio = new Audio('/ambient.mp3');
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';

      // Enforce the 1-minute loop constraint:
      // When playback reaches 60s, reset to 0s and continue playing!
      this.audio.addEventListener('timeupdate', () => {
        if (this.audio && this.audio.currentTime >= this.maxDuration) {
          this.audio.currentTime = 0;
          if (this.enabled && this.isPlaying) {
            this.audio.play().catch(() => {});
          }
        }
        this.notify();
      });

      // Handle native ended just in case the track is shorter than 60s
      this.audio.addEventListener('ended', () => {
        if (this.audio && this.enabled && this.isPlaying) {
          this.audio.currentTime = 0;
          this.audio.play().catch(() => {});
        }
      });

      this.initialized = true;

      // Autoplay attempt on first user gesture across window
      const startOnGesture = () => {
        if (this.enabled && !this.isPlaying) {
          this.play();
        }
        window.removeEventListener('click', startOnGesture);
        window.removeEventListener('keydown', startOnGesture);
        window.removeEventListener('touchstart', startOnGesture);
      };

      window.addEventListener('click', startOnGesture, { once: true });
      window.addEventListener('keydown', startOnGesture, { once: true });
      window.addEventListener('touchstart', startOnGesture, { once: true });
    } catch (err) {
      console.warn('Ambient audio could not be initialized:', err);
    }
  }

  play() {
    this.init();
    if (!this.audio || !this.enabled) return;

    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.notify();
      })
      .catch((err) => {
        // User gesture required or blocked by browser policy
        this.isPlaying = false;
        this.notify();
      });
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;

    if (this.enabled) {
      this.play();
    } else {
      this.pause();
    }
    return this.enabled;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        isPlaying: this.isPlaying,
        enabled: this.enabled,
        currentTime: this.audio ? Math.floor(this.audio.currentTime) : 0,
        maxDuration: this.maxDuration,
      });
    }
  }
}

export const ambientAudio = new AmbientAudioController();
