// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Importación para Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhFMdW9RPYSpZGzv_zh1DyCzUyvaiR2so",
    authDomain: "calculadora-venta.firebaseapp.com",
    projectId: "calculadora-venta",
    storageBucket: "calculadora-venta.firebasestorage.app",
    messagingSenderId: "976245908472",
    appId: "1:976245908472:web:52b725da442b1330d2ac0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app); // Exportación de la base de datos
