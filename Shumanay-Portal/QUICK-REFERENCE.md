# ⚡ TEZKOR REFERENCE GUIDE

## 🚀 BOSHLASH

```bash
# Windows - Terminalda yoki PowerShell'da:
cd "C:\Sites File\UzMa'halle\Shumanay-Portal"
python -m http.server 8000

# Keyin brauzeringizga yozing:
http://localhost:8000/auth.html
```

---

## 🔐 LOGIN HISOBLARI

| Rol | Username | Parol | Huquqlar |
|-----|----------|-------|---------|
| Admin | admin | admin123 | Barch tahrirlash, o'chirish, qo'shish |
| User | user | user123 | Faqat ko'rish |

---

## 📄 SAHIFALAR

| Sahifa | URL | Maqsad |
|--------|-----|--------|
| Login | `index.html` → auth.html | Kirish va registratsiya |
| Portal | index.html | Asosiy veb-portal |
| Admin | admin.html | Admin paneli (admin uchun) |

---

## 🎮 JOY TUGMALARI

### Index.html'da:
- **Tahrirlash:** Har bir yangilik/faoliyat yanida (admin uchun)
- **O'chirish:** Har bir yangilik/faoliyat yanida (admin uchun)
- **+ Yangilik Qo'sh:** Admin panelida
- **+ Faoliyat Qo'sh:** Admin panelida
- **📥 Ma'lumot Yuklab Olish:** Admin panelida (data.json)
- **Chiqish:** O'ng yuqori burchakda

### Admin.html'da:
- **Tab:** Dashboard, Foydalanuvchilar, Sozlamalar
- **Yangilik Qo'shish:** Tahrirlash tugmasi
- **Faoliyat Qo'shish:** Tahrirlash tugmasi
- **Sayt Sozlamalari:** Sozlamalar tabida

---

## 📝 YANGILIK QAVLAN

1. "+ Yangilik Qo'sh" tugmasini bosing
2. Sarlavhani yozing
3. Tavsifni yozing
4. Rasm URL'sini yozing (https://example.com/image.jpg)
5. "Saqlash" tugmasini bosing

---

## 🎯 FAOLIYAT QAVLAN

1. "+ Faoliyat Qo'sh" tugmasini bosing
2. Nomni yozing
3. Tavsifni yozing
4. Emoji/Icon tanlang (⚡ 👥 📊 📢 📄 🛡️ 📈 🏗️ 📹)
5. "Saqlash" tugmasini bosing

---

## 🔧 TAHRIRLASH

1. Tahrlash tugmasini bosing
2. O'zgarishi daxillashashni o'zgartiring
3. "Saqlash" tugmasini bosing

---

## 🗑️ O'CHIRISH

1. O'chirish tugmasini bosing
2. Tasdiqni bosing
3. ✅ O'chirildi!

---

## 🔐 PAROL O'ZGARTIRISH

1. Browser DevTools (F12) oching
2. Console'ga quyidagini yozing:
```javascript
let users = JSON.parse(localStorage.getItem('users'));
users[0].password = 'newpassword'; // index 0 = admin
localStorage.setItem('users', JSON.stringify(users));
```
3. Brauzer avval yoqa (Ctrl+Shift+Delete)

---

## 📲 FOYDALANUVCHI QAVLAN

1. auth.html'da "Ro'yxatdan O'tish" tabini tanlang
2. To'liq ismni yozing
3. Email'ni yozing
4. Foydalanuvchi nomini yozing
5. Parolni yozing (min 6 ta belgi)
6. Parolni tasdiqlang
7. "Ro'yxatdan O'tish" tugmasini bosing
8. Login qilish uchun kirishga o'ting

---

## 🛠️ MUAMMOLARNI HAL QILISH

### "Sahifa yuklanmayapti"
```bash
# Server ishga tushirilganligini tekshiring:
python -m http.server 8000
```

### "Login qilmayapti"
```bash
# Cache'ni tozalang:
Ctrl+Shift+Delete
Keyin http://localhost:8000 qayta oching
```

### "Admin tugmalari ko'rinmayapti"
```
admin / admin123 bilan login qiling
```

---

## 💾 MA'LUMOT YUKLAB OLISH

1. Admin panelida "📥 Ma'lumot Yuklab Olish" bosing
2. data.json fayli yuklab olinadi
3. Xavfsiz joyda saqlang

---

## 🌐 URL MANZILLARI

```
Portal:     http://localhost:8000/index.html
Login:      http://localhost:8000/auth.html
Admin:      http://localhost:8000/admin.html
API Yo'q:   localStorage ishlatiladi
```

---

## 📂 FAYLLAR JOYLASHGAN

```
C:\Sites File\UzMa'halle\Shumanay-Portal\
├── index.html         ← Asosiy portal
├── auth.html          ← Login/Register
├── admin.html         ← Admin paneli
├── js/auth.js         ← Avtentifikatsiya
├── js/app.js          ← Asosiy mantiq
├── data/data.json     ← Kontenti
└── data/users.json    ← Foydalanuvchilar
```

---

## 🎨 RANG KODLARI

```
Asosiy Mavi:    #003d82
Ikkinchi Mavi:  #005daa
Svetliy Fon:    #f8f9fa
Lab Fon:        #f0f4f8
Xato Qizil:     #dc2626
Muvaffaqiyat:   #16a34a
```

---

## ⚙️ TAILWIND CSS KLASSLARI

```html
<!-- Mavi Button -->
<button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Bosish
</button>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>

<!-- Card -->
<div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"></div>

<!-- Input -->
<input class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
```

---

## 🎓 JAVASCRIPT KOMANDALAR

```javascript
// Foydalanuvchini olish
const user = auth.getCurrentUser();
console.log(user);

// Admin tekshirish
if (auth.isAdmin()) { console.log('Admin'); }

// Ma'lumotlarni olish
const data = JSON.parse(localStorage.getItem('siteData'));
console.log(data);

// Sahifani yangilash
app.render();

// Sahifani qayta yüklemek
location.reload();
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
Mobile:  < 768px   (1 ustun)
Tablet:  768-1199px (2 ustun)
Desktop: 1200px+   (3 ustun)
```

---

## 🔔 MUHIM!

⚠️ Production uchun:
- [ ] Parollarni Hashing qilish
- [ ] Real Database ishlatish
- [ ] HTTPS konfiguratsiya qilish
- [ ] API Gateway qo'shish
- [ ] Rate Limiting qo'shish
- [ ] CORS keying qilish

---

## 📞 ALOQA

Shumanay Tumani Hokimligi
📱 +99861-346-24-73
📧 info@shumanay.uz

---

**HECH NARSA TUSHUNMADINGIZ?**
DevTools (F12) → Console → Ishlata boshla!

---

© 2024 Shumanay Khokimiyat | Qoraqqalpog'iston ASSR
