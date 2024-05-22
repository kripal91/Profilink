
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHOpRBH3cZuIOI37aWdt4YuBYcAVh37_E",
    authDomain: "profilink-a1bac.firebaseapp.com",
    projectId: "profilink-a1bac",
    storageBucket: "profilink-a1bac.appspot.com",
    messagingSenderId: "682749254910",
    appId: "1:682749254910:web:792a282cbde00b3bce59af",
    measurementId: "G-Q5F3XLD7DF"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };




