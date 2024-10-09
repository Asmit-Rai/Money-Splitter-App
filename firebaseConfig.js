// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCkevI8TimIgIgNxU_TBHuqfa7VrZYLu0E",
  authDomain: "d-transaction-app.firebaseapp.com",
  projectId: "d-transaction-app",
  storageBucket: "d-transaction-app.appspot.com",
  messagingSenderId: "739163871374",
  appId: "1:739163871374:web:5f4e5c20b9265e01e311df",
  measurementId: "G-PGJ3K407LM"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

