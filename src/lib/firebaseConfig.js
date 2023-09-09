// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/analytics';





import { } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"
import { } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
