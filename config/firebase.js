// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5o1l8_ZLU9zdVUlWAJltlE6iAoGJJylQ",
  authDomain: "hogwartsparadise-2b8ea.firebaseapp.com",
  databaseURL: "https://hogwartsparadise-2b8ea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hogwartsparadise-2b8ea",
  storageBucket: "hogwartsparadise-2b8ea.firebasestorage.app",
  messagingSenderId: "89761790764",
  appId: "1:89761790764:web:fdfe15ba2f5570dbfb4a89",
  measurementId: "G-3VD6BJ8H65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export const auth = getAuth(app);
export const db = getFirestore(app);

export default class Firebase {
    constructor() {
      // app is already initialized above
      this.db = getDatabase(app);
    }
  }