import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "syntaxai-5d89d.firebaseapp.com",
  projectId: "syntaxai-5d89d",
  storageBucket: "syntaxai-5d89d.firebasestorage.app",
  messagingSenderId: "477099585282",
  appId: "1:477099585282:web:ac9b2d65b694612ac1dc1b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();