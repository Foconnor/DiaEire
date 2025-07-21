import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbEJ7j6LqrYSiAGnnj51SmQkLmpvyYgXE",
  authDomain: "diaeire.firebaseapp.com",
  projectId: "diaeire",
  storageBucket: "diaeire.firebasestorage.app",
  messagingSenderId: "728802706045",
  appId: "1:728802706045:web:528a151ab35a8425256714",
  measurementId: "G-8M0QCSVTSK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };