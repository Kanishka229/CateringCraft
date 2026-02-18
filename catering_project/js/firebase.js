
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyC7vH9Km127NKd4Scigg3LJts5A4Mppu3A",
    authDomain: "catering-reservation-f0895.firebaseapp.com",
    projectId: "catering-reservation-f0895",
    storageBucket: "catering-reservation-f0895.firebasestorage.app",
    messagingSenderId: "815352672480",
    appId: "1:815352672480:web:b7658e14364c73b40b6085"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
