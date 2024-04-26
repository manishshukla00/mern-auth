import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-auth-96486.firebaseapp.com",
  projectId: "mern-auth-96486",
  storageBucket: "mern-auth-96486.appspot.com",
  messagingSenderId: "418685084749",
  appId: "1:418685084749:web:14187fd9a56258f1c92804",
};

export const app = initializeApp(firebaseConfig);
