# Shumanay Tumani Hokimligi - Raqamli Portal

**O'ZBEKISTON RESPUBLIKASI QORAQQALPOG'ISTON HOKIMLIGI**

Pixel-Perfect Web Portalining Pixel-Perfect Klon Uchun Tugma Bosilgan Avtomatlashtirish Tizimi va O'zbekcha Foydalanuvchi Interface.

---

## ✨ Xususiyatlari

✅ **Autentifikatsiya Tizimi**
- Login va Ro'yxatdan O'tish
- localStorage orqali ma'lumot saqlash
- Admin va Foydalanuvchi rollari

✅ **Admin Paneli**
- Qabul qilish malumotlarni o'zgartirish
- Yangilik qo'shish/tahrirlash/o'chirish
- Faoliyat qo'shish/tahrirlash/o'chirish
- Ma'lumotlarni yuklab olish

✅ **Pixel-Perfect Dizayn**
- Tailwind CSS asosida
- 100% Uzbekcha UI
- Responsive o'lchamlar
- Desktop va Mobile uchun optimallashtirilgani

✅ **JSON-Asosida Boshqaruv**
- Markazlashtirilgan ma'lumot tuzilishi
- Avtomatik saqlash
- Dinamik yangilash

---

## 🚀 Boshlash

### 1️⃣ Fayllarni Tekshirish

Quyidagi papkalar va fayllar yaratilgan:

```
Shumanay-Portal/
├── index.html              # Asosiy portal bo'shlang'ichi
├── auth.html               # Login/Ro'yxatdan O'tish
├── js/
│   ├── auth.js            # Autentifikatsiya mantigi
│   └── app.js             # Asosiy ilova mantigi
└── data/
    ├── data.json          # Sayt ma'lumotlari
    └── users.json         # Foydalanuvchilar ma'lumotlari
```

### 2️⃣ Fayllarni Ochish

1. Fayl menejerida `Shumanay-Portal` papkasini oching
2. `index.html` faylni o'ng bosing va "Open with Live Server" ni tanlang
   - YOKI: `python -m http.server 8000` buyrug'ini terminalda bajaring
   - YOKI: Faylni brauzer orqali oching

### 3️⃣ Login Qilish

Test Hisoblari:

**Admin Roli:**
- Foydalanuvchi: `admin`
- Parol: `admin123`

**Oddiy Foydalanuvchi:**
- Foydalanuvchi: `user`
- Parol: `user123`

---

## 🔐 Autentifikatsiya Tizimi

### Login Jarayoni:
1. `auth.html` sahifasida foydalanuvchi nomi va parolni kiriting
2. Sistem localStorage'da ro'yxat qiladi
3. Muvaffaqiyatli login'dan so'ng index.html ga o'tkaziladi

### Ro'yxatdan O'tish:
1. "Ro'yxatdan O'tish" tabini bosing
2. Barcha maydonlarni to'ldiring
3. Parollar mos kelishi kerak
4. Yangi hisob yaratiladi

---

## 👨‍💼 Admin Xususiyatlari

Admin (admin/admin123) hisob bilan kiring va quyidagi xususiyatlardan foydalaning:

### ✏️ Tahrirlash:
- Har bir yangilik yoki faoliyatning yanida **"Tahrirlash"** tugmasi mavjud
- Tugmani bosing va ma'lumotlarni o'zgartiring
- "Saqlash" tugmasini bosing

### ➕ Qo'shish:
- Admin panelida **"+ Yangilik Qo'sh"** tugmasi
- Admin panelida **"+ Faoliyat Qo'sh"** tugmasi
- Forma to'ldiring va saqlang

### 🗑️ O'chirish:
- Har bir element yanida o'chirish tugmasi
- Tasdiqdan so'ng element o'chiriladi

### 📥 Ma'lumot Yuklab Olish:
- Admin panelida **"📥 Ma'lumot Yuklab Olish"** tugmasi
- JSON faylini kompyuteringizga saqlang

---

## 📊 Ma'lumot Strukturasi

### data.json formatı:

```json
{
  "site": {
    "title": "Portal Nomi",
    "subtitle": "Sub Sarlavha",
    "phone": "+998-XX-XXX-XX-XX",
    "logo": "URL"
  },
  "navigation": [
    {"id": 1, "label": "Menu", "url": "#"}
  ],
  "news": [
    {
      "id": 1,
      "title": "Yangilik Sarlavhasi",
      "description": "Tavsifi",
      "image": "URL",
      "date": "12.04.2026",
      "dateNum": 12,
      "month": "APREL"
    }
  ],
  "activities": [
    {
      "id": 1,
      "title": "Faoliyat Nomi",
      "description": "Tavsifi",
      "icon": "⚡"
    }
  ],
  "sidebar": [
    {
      "id": 1,
      "date": "11",
      "month": "APREL",
      "title": "Yangilik"
    }
  ]
}
```

---

## 🛠️ Texnik Ma'lumotlar

- **Stack:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6+)
- **Storage:** localStorage (Browser Memory)
- **Responsive:** Desktop va Mobile
- **Tillar:** Uzbekcha, English (labellar)

---

## ⚙️ Sozlamalar

### Username va Parol Uchun:
- Minimum parol uzunligi: 6 ta belgi
- Email validatsiyasi: Zaruri
- Foydalanuvchi nomi yoki Email bilan kirilishi mumkin

### Ma'lumot Saqlash:
- Barcha ma'lumotlar localStorage'da saqlanadi
- Brauzer ochiq turib o'chirilsa ma'lumotlar yo'q bo'ladi
- Fayl yuklab olish uchun JSON backup qiling

---

## 🔒 Xavfsizlik Diqqati

⚠️ **Ishlatiladigan Produksiya:**
- Parollarni hashing qilish (bcrypt, argon2)
- HTTPS protokoli
- CORS keying qilish
- Database foydalanish (localStorage emas)
- Session JWT tokenlari

---

## 📱 Responsive Dizayn

- **Desktop:** 1200px+ - To'liq qismlar
- **Tablet:** 768px-1199px - 2-3 ustun
- **Mobile:** <768px - 1 ustun, Full width

---

## 🎨 Rang Palitari

- **Asosiy:** Mavi (#003d82, #005daa)
- **Fon:** Oq (#ffffff)
- **Matn:** Qora (#000000)
- **Chegaralar:** Och Surx (#e0e0e0)

---

## 📞 Qo'llab-Quvvatlash

**Shumanay Tumani Hokimligi**
- Telefon: +99861-346-24-73
- Email: info@shumanay.uz

---

## 📜 Litsenziya

© 2024 Shumanay Tumani Hokimligi. Barcha huquqlar himoyalangan.

---

## 🎉 Foydalanaylik Tuyorchiligi

**Shuni Eslang:**
1. Birinchi marta login/register qilish kerak
2. Admin bo'lsa, maxsus tahrirlash tugmalari ko'rinadi
3. Ma'lumotlar browser'da saqlanadi
4. Brauzer history tozalansa ma'lumotlar o'chirilishi mumkin

**Muammo Yuzaga Kelsa:**
- Brauzer cache'sini tozalang (Ctrl+Shift+Delete)
- Sahifani qayta yükleyin (F5 yoki Ctrl+R)
- Console (F12) da xatoliklarni tekshiring

---

**Tayyor bo'ldir! Amaliy portalingiz o'zi qayta tayyor. 🚀**
