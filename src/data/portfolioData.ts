import { PortfolioWork, PublicProfile, WorkCategoryValue } from '../types/portfolio';

export const ADMIN_EMAIL = 'ramziddinios@gmail.com';
export const HERO_IMAGE = '/src/assets/images/hero_studio_portrait_1795603600647.jpg';

export const DEFAULT_PROFILE: PublicProfile = {
  ownerUid: 'default',
  brandName: 'Ramziddin Mirzaev',
  specialty: "Toshkent · Fincube · Sug'urta dasturiy ta'minoti (Oracle APEX)",
  headline: "Dasturiy ta'minot, mobil ilovalar va sun'iy intellekt yechimlari.",
  subheadline:
    "Fincube kompaniyasining sug'urta kompaniyalari uchun dasturiy ta'minot bo'limida Oracle APEX asosida tizimlar ishlab chiqaman. Shuningdek, foydali Telegram botlar, iOS ilovalari va biznes avtomatizatsiyasi loyihalarini yarataman.",
  aboutBio:
    "Men Ramziddin Mirzaev — Fincube kompaniyasining sug'urta kompaniyalari uchun dasturiy ta'minot bo'limida ishlayman. Asosiy foydalanadigan texnologiyam — Oracle APEX hamda Oracle ma'lumotlar bazasi arxitekturasi.\n\nBundan tashqari, haydovchi va yo'lovchilar qulayligi uchun yaratilgan mutlaqo bepul @ViloyatTaxiUzBot loyihasi muallifiman va hozirda uning iOS ilovasi ustida ish olib boryapman. Shu bilan birga, biznes egalari uchun sun'iy intellekt yordamida avtomatizatsiya tizimlarini hamda O'zbekiston ishlab chiqaruvchi korxonalari uchun yangi raqamli yechim ustida ishlayapmiz.",
  experienceYears: 'Fincube',
  skills: [
    'Oracle APEX',
    'Oracle SQL & PL/SQL',
    'Swift & iOS Dasturlash',
    'Telegram Bot API',
    "Sun'iy Intellekt (AI)",
    "Sug'urta Tizimlari",
    'Biznes Avtomatizatsiya',
    'REST API Integratsiya',
  ],
  contactEmail: 'ramziddinios@gmail.com',
  telegram: '@mirzaev211',
  githubUrl: 'https://github.com',
  behanceUrl: 'https://behance.net',
  instagramUrl: 'https://instagram.com',
};

export const CATEGORY_LABELS: Record<WorkCategoryValue, { uz: string; en: string }> = {
  apex: { uz: 'Oracle APEX', en: 'Oracle APEX' },
  bot: { uz: 'Telegram Bot', en: 'Telegram Bot' },
  mobile: { uz: 'Mobil / iOS', en: 'Mobile / iOS' },
  ai: { uz: 'AI Avtomatizatsiya', en: 'AI Automation' },
  web: { uz: 'Veb-sayt', en: 'Website' },
  uiux: { uz: 'UI / UX Dizayn', en: 'UI / UX Design' },
  branding: { uz: 'Brending', en: 'Branding' },
  other: { uz: 'Yangilik / Boshqa', en: 'Upcoming / Other' },
};

export const STARTER_WORKS: PortfolioWork[] = [
  {
    id: 'starter-fincube-apex',
    ownerUid: 'starter',
    title: "Fincube — Sug'urta Kompaniyalari Uchun Dasturiy Ta'minot",
    category: 'apex',
    year: '2025-2026',
    client: 'Fincube',
    role: 'Oracle APEX Dasturchi',
    summary:
      "Sug'urta kompaniyalarining asosiy ish jarayonlarini boshqarish uchun Oracle APEX texnologiyasi asosida yaratilayotgan korporativ tizimlar.",
    details:
      "Fincube kompaniyasining sug'urta kompaniyalari uchun dasturiy ta'minot bo'limida Oracle APEX va PL/SQL yordamida yuqori yuklamali, xavfsiz biznes modullari ishlab chiqiladi.\n\n• Sug'urta polislari, da'vo arizalari va hisob-kitob jarayonlarini avtomatlashtirish.\n• Tezkor tahliliy hisobotlar, interaktiv jadvallar va rollarga asoslangan kirish nazorati.\n• Tashqi to'lov va davlat xizmatlari API tizimlari bilan barqaror integratsiya.",
    imageUrl: '/src/assets/images/work_oracle_apex_fincube_1795606043059.jpg',
    liveUrl: '',
    tools: ['Oracle APEX', 'Oracle SQL', 'PL/SQL', 'REST API'],
    featured: true,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-viloyat-taxi-bot',
    ownerUid: 'starter',
    title: '@ViloyatTaxiUzBot — Viloyatlararo Bepul Taksi Boti',
    category: 'bot',
    year: '2025-2026',
    client: 'Ommaviy loyiha (Mutlaqo bepul)',
    role: 'Muallif va Full-Stack Dasturchi',
    summary:
      "Haydovchi va yo'lovchilar qulayligi uchun yaratilgan, viloyatlararo qatnovni osonlashtiruvchi mutlaqo bepul Telegram bot.",
    details:
      "O'zbekiston bo'ylab viloyatlararo safarlarda haydovchi va yo'lovchilarni ortiqcha vositachilarsiz, tez va qulay bog'lash maqsadida ishlab chiqilgan.\n\n• Yo'lovchilar yo'nalish, sana va bo'sh o'rinlar soni bo'yicha bir necha soniyada mos haydovchini topishi mumkin.\n• Haydovchilar o'z qatnov e'lonlarini joylab, yo'lovchi murojaatlarini tezkor qabul qiladi.\n• Barcha imkoniyatlar haydovchi va yo'lovchilar uchun mutlaqo bepul taqdim etiladi.",
    imageUrl: '/src/assets/images/work_viloyat_taxi_bot_1795605508416.jpg',
    liveUrl: 'https://t.me/ViloyatTaxiUzBot',
    tools: ['Telegram Bot API', 'Node.js', 'TypeScript', 'PostgreSQL'],
    featured: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-viloyat-taxi-ios',
    ownerUid: 'starter',
    title: 'ViloyatTaxi — iOS Mobil Ilovasi (Ishlab chiqilmoqda)',
    category: 'mobile',
    year: '2026',
    client: 'ViloyatTaxi Ekotizimi',
    role: 'iOS Dasturchi',
    summary:
      "@ViloyatTaxiUzBot loyihasining davomi sifatida Apple iPhone qurilmalari uchun maxsus iOS mobil ilovasi ustida ish olib borilmoqda.",
    details:
      "Telegram bot foydalanuvchilari uchun yanada tezkor, qulay va zamonaviy mobil tajribani taqdim etish maqsadida ishlab chiqilayotgan iOS ilovasi.\n\n• Interaktiv xarita orqali viloyatlararo yo'nalishlarni jonli ko'rish va tanlash.\n• Haydovchi va yo'lovchilar uchun tezkor Push-bildirishnomalar hamda buyurtma holati.\n• Swift va SwiftUI asosida yengil va barqaror mobil arxitektura.",
    imageUrl: '/src/assets/images/work_viloyat_taxi_ios_1795605509223.jpg',
    liveUrl: 'https://t.me/ViloyatTaxiUzBot',
    tools: ['Swift', 'SwiftUI', 'iOS SDK', 'MapKit'],
    featured: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-ai-automation',
    ownerUid: 'starter',
    title: "Biznes Egalari Uchun Sun'iy Intellekt Avtomatizatsiyasi",
    category: 'ai',
    year: '2025-2026',
    client: "Kichik va o'rta bizneslar",
    role: 'AI Muhandis va Avtomatizatsiya Mutaxassisi',
    summary:
      "Mijozlar bilan muloqot, buyurtma qabul qilish va hisobotlarni sun'iy intellekt yordamida avtomatlashtirish xizmatlari.",
    details:
      "Biznes egalarining vaqtini tejash va xizmat sifatini oshirish uchun zamonaviy sun'iy intellekt tizimlari joriy etiladi.\n\n• Telegram, Instagram va veb-sayt orqali kelgan murojaatlarga 24/7 aqlli AI-maslahatchi javob berishi.\n• Buyurtmalarni avtomatik ravishda CRM, Google Sheets yoki ma'lumotlar bazasiga saqlash.\n• Rahbarlar uchun kunlik savdo va murojaatlar bo'yicha qisqa tahliliy xulosalar tayyorlash.",
    imageUrl: '/src/assets/images/work_ai_automation_1795605510892.jpg',
    liveUrl: '',
    tools: ['Gemini AI', 'OpenAI API', 'Telegram API', 'CRM Integratsiya'],
    featured: false,
    isPublished: true,
    isStarter: true,
  },
  {
    id: 'starter-uz-manufacturing',
    ownerUid: 'starter',
    title: "O'zbekiston Ishlab Chiqaruvchi Korxonalari Uchun Yangi Loyiha (Tez kunda)",
    category: 'other',
    year: '2026',
    client: "O'zbekiston ishlab chiqaruvchilari",
    role: 'Loyiha muallifi va dasturchi',
    summary:
      "O'zbekistondagi ishlab chiqaruvchi korxonalar uchun maxsus yangilik ustida ish olib bormoqdamiz. Bizni kuzatishda davom eting!",
    details:
      "Mahalliy ishlab chiqaruvchi korxonalarning ishlab chiqarish jarayonlari, buyurtmalar oqimi va hamkorlar bilan ishlash tizimini zamonaviy raqamli bosqichga olib chiqadigan yangi loyiha ustida faol ish olib borilmoqda.\n\n• Korxonalar faoliyatini shaffof rejalashtirish va nazorat qilish.\n• Ishlab chiqaruvchilar hamda xaridorlar o'rtasida qulay raqamli aloqa.\n• Tez orada batafsil taqdimot — bizni kuzatishda davom eting!",
    imageUrl: '/src/assets/images/work_uzbekistan_manufacturing_1795607486044.jpg',
    liveUrl: '',
    tools: ['Oracle APEX', 'Veb Platforma', 'AI Yordamchi', 'Tez kunda'],
    featured: false,
    isPublished: true,
    isStarter: true,
  },
];
