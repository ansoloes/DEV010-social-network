// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCFX9nccrxLMKhDR35FCsRkiNwg9UL4vU',
  authDomain: 'onlypaws-8b6cb.firebaseapp.com',
  projectId: 'onlypaws-8b6cb',
  storageBucket: 'onlypaws-8b6cb.appspot.com',
  messagingSenderId: '57214639350',
  appId: '1:57214639350:web:2bf2b904f656e016e8e0d7',
  measurementId: 'G-4LMCV6VEMQ',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Apps
const auth = getAuth(app);
// Es importante utilizar FireStore, pues es parte de los Objetivos de aprendizaje
const db = getFirestore(app);

// exporto lo que usarás después
export {
  auth,
  db,
};
