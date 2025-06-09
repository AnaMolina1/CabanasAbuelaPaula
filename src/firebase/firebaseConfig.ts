// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Agregar Firestore
import { getAnalytics } from "firebase/analytics"; // Opcional, si usas Analytics

const firebaseConfig = {
  apiKey: "AIzaSyC35BcMsfKVGTSUers3YLXZoROiUgPCeLE",
  authDomain: "proyecto-reserva-cabanas.firebaseapp.com",
  projectId: "proyecto-reserva-cabanas",
  storageBucket: "proyecto-reserva-cabanas.firebasestorage.app",
  messagingSenderId: "758588487490",
  appId: "1:758588487490:web:bf00365351a67144a1badb",
  measurementId: "G-B23ER48VGX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const analytics = getAnalytics(app); // Puedes omitir esta línea si no usas Analytics

export { app, db, analytics };
