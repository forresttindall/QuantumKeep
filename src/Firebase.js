// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJqDtukWFzpCdR94VwEfeziRy-zCtEjGE",
  authDomain: "quantumkeep-bfb74.firebaseapp.com",
  projectId: "quantumkeep-bfb74",
  storageBucket: "quantumkeep-bfb74.firebasestorage.app",
  messagingSenderId: "32328154038",
  appId: "1:32328154038:web:06c1b9bc821c2d16c41f17",
  measurementId: "G-2WRM7S9TG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { auth, functions };