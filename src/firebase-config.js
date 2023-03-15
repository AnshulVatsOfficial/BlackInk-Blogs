// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfVyW5Wjbqi0N6uhFAK7UvE3S4gCn-hCk",
  authDomain: "blackink-a1fe6.firebaseapp.com",
  projectId: "blackink-a1fe6",
  storageBucket: "blackink-a1fe6.appspot.com",
  messagingSenderId: "1066688062237",
  appId: "1:1066688062237:web:b719f4e402acf43eaaf7f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
export const realtimeDatabase = getDatabase(app);