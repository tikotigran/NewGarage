const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initFirebase() {
  const userId = 'Kzl80KTKmRfQkqtKzrHprwEu5YD2'; // Ваш ID пользователя
  
  const settings = {
    partners: [{ id: 'me', name: 'Я' }],
    currency: '€',
    language: 'ru',
    theme: 'system',
    features: {
      sorting: true,
      purchaseDate: true,
      licensePlate: true,
      search: true,
      documents: true,
      km: true,
      year: true,
    },
  };

  try {
    await setDoc(doc(db, 'users', userId, 'settings', 'main'), settings);
    console.log('Настройки успешно созданы в Firebase!');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

initFirebase();
