const EMAILJS_SERVICE_ID = 'service_imctb73';
const EMAILJS_TEMPLATE_ID = 'template_reset_code';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

function ensureEmailJSInitialized() {
  if (!window.emailjs) {
    throw new Error('EmailJS kutubxonasi yuklanmadi. auth.html sahifasida https://cdn.emailjs.com/dist/email.min.js ni ulashingiz kerak.');
  }

  if (!EMAILJS_PUBLIC_KEY || EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
    throw new Error('EmailJS public key o\'rnatilmagan. email-service.js faylida EMAILJS_PUBLIC_KEY qiymatini kiriting.');
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);
}

function sendPasswordResetEmail(toEmail, toName, resetCode, resetLink) {
  ensureEmailJSInitialized();

  const templateParams = {
    to_email: toEmail,
    to_name: toName,
    reset_code: resetCode,
    reset_link: resetLink
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}
