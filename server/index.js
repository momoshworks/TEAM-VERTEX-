import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'vertex-db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial database seeds
const DEFAULT_DB = {
  visits: 142,
  records: [],
  events: [
    {
      id: 'EVT-101',
      title: 'معسكر التعلم العميق وتطبيقات الرؤية الحاسوبية',
      enTitle: 'Deep Learning & Computer Vision Bootcamp',
      category: 'معسكر تدريبي (Bootcamp)',
      track: 'ذكاء اصطناعي',
      targetDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
      location: 'معمل الذكاء الاصطناعي 304 — كلية الذكاء الاصطناعي',
      instructor: 'بشمهندس محمد شعبان (Technical Leader)',
      seats: '40 مقعد متاح',
      status: 'قادمة — التسجيل مفتوح',
      desc: 'تطبيق عملي خطوة بخطوة لبناء نماذج Convolutional Neural Networks (CNNs) وتصنيف الصور الطبية واكتشاف الأنماط.',
    },
    {
      id: 'EVT-102',
      title: 'هاكاثون دلتا البرمجي لحلول الذكاء الاصطناعي',
      enTitle: 'Delta AI Hackathon & Ideation Sprint',
      category: 'هاكاثون ومنافسة',
      track: 'هاكاثون',
      targetDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      location: 'المدرج المركزي (Hall B) — كلية الذكاء الاصطناعي',
      instructor: 'إدارة العمليات (Bahey & Team)',
      seats: '100 مقعد متاح',
      status: 'مقاعد محدودة',
      desc: 'منافسة مكثفة لمدة 24 ساعة لبناء حلول تقنية ذكية تخدم المجتمع وتأهيل الفرق للمسابقات العالمية.',
    },
    {
      id: 'EVT-103',
      title: 'ورشة هياكل البيانات والخوارزميات بلغة بايثون',
      enTitle: 'Data Structures & Problem Solving Workshop',
      category: 'ورشة عمل أكاديمية',
      track: 'برمجة',
      targetDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000).toISOString(),
      location: 'معمل الحاسب المتقدم 202',
      instructor: 'أعضاء دعم المواد (Kareem & Abdullah)',
      seats: '35 مقعد متاح',
      status: 'قريباً',
      desc: 'شرح وتدريب على خوارزميات البحث والترتيب وهياكل البيانات الأساسية استعداداً للامتحانات ومسابقات ACPC.',
    },
  ],
  updatedAt: new Date().toISOString(),
};

// Read Database
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDB(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return DEFAULT_DB;
  }
}

// Write Database
function writeDB(data) {
  try {
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database file:', err);
    return false;
  }
}

// Parse Request Body Helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// Send JSON Response Helper with CORS
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

// Initialize server
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  // 1. Health check & status
  if (pathname === '/api' || pathname === '/api/status' || pathname === '/') {
    const db = readDB();
    return sendJSON(res, 200, {
      status: 'online',
      service: 'VERTEX AI Cloud Database Server',
      recordsCount: db.records.length,
      eventsCount: db.events.length,
      visitsCount: db.visits,
      lastUpdated: db.updatedAt,
    });
  }

  // 2. Visits Endpoint
  if (pathname === '/api/visits') {
    const db = readDB();
    if (method === 'GET') {
      return sendJSON(res, 200, { visits: db.visits });
    }
    if (method === 'POST') {
      db.visits = (db.visits || 0) + 1;
      writeDB(db);
      return sendJSON(res, 200, { success: true, visits: db.visits });
    }
  }

  // 3. Service Records Endpoint
  if (pathname === '/api/records') {
    const db = readDB();
    if (method === 'GET') {
      return sendJSON(res, 200, { success: true, records: db.records });
    }
    if (method === 'POST') {
      const newRecord = await parseBody(req);
      if (!newRecord.id) {
        newRecord.id = 'VRX-' + Math.floor(1000 + Math.random() * 9000);
      }
      if (!newRecord.timestamp) {
        newRecord.timestamp = new Date().toLocaleString('ar-EG');
      }
      db.records.unshift(newRecord);
      writeDB(db);
      return sendJSON(res, 201, { success: true, record: newRecord, total: db.records.length });
    }
  }

  // 4. Events Endpoint
  if (pathname === '/api/events') {
    const db = readDB();
    if (method === 'GET') {
      return sendJSON(res, 200, { success: true, events: db.events });
    }
    if (method === 'POST') {
      const payload = await parseBody(req);
      // Can be a single event or full events list
      if (Array.isArray(payload)) {
        db.events = payload;
      } else if (payload.id) {
        const existingIdx = db.events.findIndex((e) => e.id === payload.id);
        if (existingIdx >= 0) {
          db.events[existingIdx] = { ...db.events[existingIdx], ...payload };
        } else {
          db.events.unshift(payload);
        }
      } else {
        payload.id = 'EVT-' + Math.floor(100 + Math.random() * 900);
        db.events.unshift(payload);
      }
      writeDB(db);
      return sendJSON(res, 200, { success: true, events: db.events });
    }
  }

  // 5. Delete event by ID
  if (pathname.startsWith('/api/events/') && method === 'DELETE') {
    const id = pathname.replace('/api/events/', '');
    const db = readDB();
    db.events = db.events.filter((e) => e.id !== id);
    writeDB(db);
    return sendJSON(res, 200, { success: true, events: db.events });
  }

  // 404 Not Found
  return sendJSON(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, () => {
  console.log(`🚀 VERTEX Database Server running on port ${PORT}`);
  console.log(`📡 API Status: http://localhost:${PORT}/api/status`);
});
