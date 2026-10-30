# 🌐 Vertex AI Team - Delta University Official Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Scene-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <b>الموقع الرسمي التفاعلي لفريق Vertex AI بجامعة الدلتا للعلوم والتكنولوجيا. تجربة بصرية ثلاثية الأبعاد بـ Three.js، مشغل صوتيات محيطي (Ambient Audio)، لوحة تحكم إدارية متكاملة، ونظام إدارة فعاليات ومسارات تقنية.</b>
</p>

</div>

---

## 🚀 Overview | نبذة عن المنصة

منصة **Vertex AI Team** هي واجهة ويب متطورة مصممة لتمثيل الفريق التكنولوجي والأكاديمي للذكاء الاصطناعي بجامعة الدلتا. تم بناء المشروع بأسلوب وتجربة رقمية سينمائية تستعرض مسارات الفريق، ورش العمل، قيادات اللجان، والابتكارات الطلابية مدعومة بخلفيات ومجسمات تفاعلية ثلاثية الأبعاد ولوحة تحكم حية للمشرفين.

---

## ✨ Key Features | المميزات الأساسية

### 🎨 تجربة المستخدم التفاعلية (Immersive UX)
- 🌌 **Interactive 3D Scene (Three.js):** مجسمات فضائية وجزيئات تفاعلية تتجاوب مع حركة الماوس والتمرير (`Vertex3DScene.jsx`).
- 🎵 **Ambient Audio Player:** مشغل مقاطع صوتية محيطية هادئة تعزز من تركيز واستغراق الزائر (`AmbientPlayer.jsx`).
- 🖱 **Custom Fluid Cursor:** مؤشر فأرة انسيابي مع تأثيرات فيزيائية ناعمة (`CustomCursor.jsx`).
- 📱 **Mobile & Desktop Responsive:** توافق تام مع جميع الشاشات والمتصفحات الحديثة.

### 💼 الوظائف والإدارة (Features & Backend)
- 🛠 **Admin Dashboard:** لوحة تحكم إدارية شاملة لإدارة المسجلين والفعاليات واستعراض التقارير (`AdminDashboard.jsx`).
- 🔒 **Secure Admin Login:** نافذة تسجيل دخول للمشرفين بحماية كلمة مرور وتحقق مشفر.
- 🎓 **Tracks & Innovation Lab:** استعراض مسارات الذكاء الاصطناعي، تعلم الآلة، علوم البيانات، وتطوير الأنظمة الذكية.
- 👥 **Leadership & Team Showcase:** قسم مخصص لقيادات الفريق وأعضاء اللجان التنفيذية.
- ⚡ **Lightweight Server Backend:** خادم Express خفيف وسريع يعتمد على التخزين المحلي المنظم (`server/data/vertex-db.json`).

---

## 🛠 Tech Stack | التقنيات المستخدمة

- **Frontend Core:** React 19, Vite 8, React DOM.
- **3D Graphics & Physics:** Three.js.
- **Styling & Icons:** Tailwind CSS v4, Lucide React Icons.
- **UI Effects:** Canvas Confetti, Custom Scroll Reveal Hooks.
- **Backend API:** Node.js, Express, Local JSON Database Engine.

---

## 📂 Project Structure | هيكل المشروع

```plaintext
TEAM-VERTEX-/
├── public/                 # الأيقونات والأصوات والصور الثابتة
│   ├── ambient.mp3         # الملف الصوتي المحيطي
│   └── favicon.svg
├── server/                 # السيرفر الخلفي وقاعدة البيانات
│   ├── data/
│   │   └── vertex-db.json  # تخزين بيانات الفريق والطلبات
│   ├── index.js            # سيرفر Express الرئيسي
│   └── README.md
├── src/                    # كود الواجهة الأمامية (React)
│   ├── assets/             # الصور والشعارات
│   ├── components/         # المكونات التفاعلية (3D, Dashboard, Hero, Navbar, ...)
│   ├── hooks/              # Custom Hooks (useScrollReveal)
│   ├── services/           # الاتصال بالسيرفر وقاعدة البيانات (cloudDb.js)
│   ├── utils/              # مشغل الصوت وتأثيرات التفاعل
│   ├── App.jsx             # المكون الجذري
│   └── main.jsx            # نقطة البداية لـ React
├── package.json            # الحزم والاعتماديات
├── vite.config.js          # إعدادات Vite
└── README.md               # التوثيق الشامل
```

---

## 🚀 How to Run | طريقة التثبيت والتشغيل

### 1. تثبيت الاعتماديات:
```bash
npm install
```

### 2. تشغيل الواجهة الأمامية (Development Mode):
```bash
npm run dev
```
أو انقر نقراً مزدوجاً على ملف `start-local.bat`.

### 3. تشغيل السيرفر الخلفي:
```bash
npm run server
```
أو انقر على `start-server.bat`.

### 4. بناء المشروع للإنتاج:
```bash
npm run build
```

---

## 👨‍💻 Developed By

**[Mohamed Shaaban (momoshworks)](https://github.com/momoshworks)** & The **Vertex AI Team**  
Faculty of Artificial Intelligence — Delta University for Science and Technology.

---

## 📄 License
This project is open-source under the MIT License.
