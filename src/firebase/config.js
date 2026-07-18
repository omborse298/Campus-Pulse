import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyCSbXyutVZUJRpgXdbBTafj2n4vfLf5J3M",

  authDomain: "campuspulse-3d4a5.firebaseapp.com",

  projectId: "campuspulse-3d4a5",

  storageBucket: "campuspulse-3d4a5.firebasestorage.app",

  messagingSenderId: "128330269668",

  appId: "1:128330269668:web:5f5bc77ddc372b67c6fdf1"

};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);