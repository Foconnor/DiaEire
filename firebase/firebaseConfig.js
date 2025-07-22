import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbEJ7j6LqrYSiAGnnj51SmQkLmpvyYgXE",
  authDomain: "diaeire.firebaseapp.com",
  projectId: "diaeire",
  storageBucket: "diaeire.firebasestorage.app",
  messagingSenderId: "728802706045",
  appId: "1:728802706045:web:528a151ab35a8425256714",
  measurementId: "G-8M0QCSVTSK"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };