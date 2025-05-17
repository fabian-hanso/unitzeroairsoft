import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv5RWvVr-eXyU2cAjcokwZi_5REAOgihU",
  authDomain: "unitzeroairsoft.firebaseapp.com",
  projectId: "unitzeroairsoft",
  storageBucket: "unitzeroairsoft.firebasestorage.app",
  messagingSenderId: "242314313405",
  appId: "1:242314313405:web:b0ac0d9106928ea35181d4",
  measurementId: "G-N14Q2YRF4E",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
