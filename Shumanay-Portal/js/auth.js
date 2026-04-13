// Authentication System with localStorage and EmailJS reset flow

class AuthManager {
  constructor() {
    this.initializeUsers();
  }

  initializeUsers() {
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          id: 1,
          username: 'admin',
          email: 'admin@shumanay.uz',
          password: 'admin123',
          fullName: 'Administrator',
          isAdmin: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          username: 'mehmon',
          email: 'user@shumanay.uz',
          password: 'user123',
          fullName: 'Test Foydalanuvchi',
          isAdmin: false,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUserByEmail(email) {
    if (!email) return null;
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserByLogin(login) {
    if (!login) return null;
    const users = this.getUsers();
    const normalized = login.toLowerCase();
    return users.find(u => u.username.toLowerCase() === normalized || u.email.toLowerCase() === normalized);
  }

  register(username, email, password, confirmPassword, fullName) {
    if (!username || !email || !password || !confirmPassword || !fullName) {
      return { success: false, message: 'Barcha maydonlar to‘ldirilishi kerak.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Parollar mos kelmadi.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.' };
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedUsername = username.trim().toLowerCase();
    const users = this.getUsers();

    if (users.some(u => u.username.toLowerCase() === trimmedUsername)) {
      return { success: false, message: 'Bu foydalanuvchi nomi allaqachon mavjud.' };
    }

    if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, message: 'Bu email allaqachon ro‘yxatdan o‘tgan.' };
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username: username.trim(),
      email: trimmedEmail,
      password,
      fullName: fullName.trim(),
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: 'Ro‘yxatdan o‘tish muvaffaqiyatli bajarildi!' };
  }

  login(login, password) {
    if (!login || !password) {
      return { success: false, message: 'Foydalanuvchi nomini va parolni kiriting.' };
    }

    const user = this.getUserByLogin(login);
    if (!user || user.password !== password) {
      return { success: false, message: 'Foydalanuvchi nomi yoki parol noto‘g‘ri.' };
    }

    const session = {
      userId: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentSession', JSON.stringify(session));
    return { success: true, message: 'Kirish muvaffaqiyatli amalga oshirildi!', user };
  }

  logout() {
    localStorage.removeItem('currentSession');
    window.location.href = 'auth.html';
  }

  checkAuthStatus() {
    return !!localStorage.getItem('currentSession');
  }

  getCurrentUser() {
    const session = localStorage.getItem('currentSession');
    return session ? JSON.parse(session) : null;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.isAdmin;
  }

  requireAuth() {
    if (!this.checkAuthStatus()) {
      window.location.href = 'auth.html';
    }
  }

  generateResetCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async startForgotPassword(email) {
    if (!email) {
      return { success: false, message: 'Email manzilini kiriting.' };
    }

    const user = this.getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Bu email bilan foydalanuvchi topilmadi.' };
    }

    const resetCode = this.generateResetCode();
    const users = this.getUsers();
    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === user.email.toLowerCase()) {
        return {
          ...u,
          resetCode,
          resetExpires: Date.now() + 20 * 60 * 1000
        };
      }
      return u;
    });

    this.saveUsers(updatedUsers);

    const resetLink = `${window.location.origin}${window.location.pathname}?reset=${encodeURIComponent(user.email)}`;
    try {
      await sendPasswordResetEmail(user.email, user.fullName, resetCode, resetLink);
      return { success: true, message: 'Tiklash kodi emailga yuborildi. Iltimos, pochtangizni tekshiring.' };
    } catch (error) {
      console.error('Email yuborishda xato:', error);
      return { success: false, message: 'Email yuborilmadi. Iltimos, keyinroq qayta urinib ko‘ring.' };
    }
  }

  verifyResetCode(email, code) {
    if (!email || !code) {
      return { success: false, message: 'Email va kodni to‘liq kiriting.' };
    }

    const user = this.getUserByEmail(email);
    if (!user || !user.resetCode) {
      return { success: false, message: 'Toksen kod topilmadi. Yana urinib ko‘ring.' };
    }

    if (Date.now() > user.resetExpires) {
      return { success: false, message: 'Kod muddati tugagan. Yangi kodni so‘rang.' };
    }

    if (user.resetCode !== code.trim()) {
      return { success: false, message: 'Kiritilgan kod noto‘g‘ri.' };
    }

    return { success: true, message: 'Kod tasdiqlandi. Endi yangi parol o‘rnating.' };
  }

  resetPassword(email, code, password, confirmPassword) {
    if (!email || !code || !password || !confirmPassword) {
      return { success: false, message: 'Barcha maydonlarni to‘ldiring.' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Parollar mos kelmadi.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak.' };
    }

    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !user.resetCode) {
      return { success: false, message: 'Parolni tiklash kodini topib bo‘lmadi.' };
    }

    if (Date.now() > user.resetExpires) {
      return { success: false, message: 'Kodning muddati tugagan. Yangi kod so‘rang.' };
    }

    if (user.resetCode !== code.trim()) {
      return { success: false, message: 'Kodni to‘g‘ri kiriting.' };
    }

    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return {
          ...u,
          password,
          resetCode: null,
          resetExpires: null
        };
      }
      return u;
    });

    this.saveUsers(updatedUsers);
    return { success: true, message: 'Parol muvaffaqiyatli yangilandi. Endi tizimga kiring.' };
  }
}

const auth = new AuthManager();
