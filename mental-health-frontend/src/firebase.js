// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBHL-XnaeyNbAXQHN_s4QMfXEjFSlrKPRU",
  authDomain: "mentalhealthchatbot-dd0bb.firebaseapp.com",
  projectId: "mentalhealthchatbot-dd0bb",
  storageBucket: "mentalhealthchatbot-dd0bb.firebasestorage.app",
  messagingSenderId: "483078619989",
  appId: "1:483078619989:web:4eb998b92aaa964ace65dc",
  measurementId: "G-BZEMTX6JKX"
};

// Make sure you only call this ONCE
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export them for use in other files
export { auth, db };
