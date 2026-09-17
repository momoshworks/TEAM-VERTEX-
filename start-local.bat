@echo off
chcp 65001 > nul
title تشغيل موقع VERTEX AI محلياً
echo ========================================================
echo       🚀 جاري تشغيل موقع VERTEX AI على جهازك محلياً...
echo ========================================================
echo.

if not exist node_modules (
    echo [!] جاري فحص وتثبيت المكتبات...
    call npm install
)

echo [+] جاري تشغيل السيرفر المحلي...
echo [+] سيتم فتح الموقع تلقائياً في المتصفح...
echo.

call npx vite --open --host
pause
