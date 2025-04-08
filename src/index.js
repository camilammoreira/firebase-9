import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAM_JiTNkMKw-OUs49q0knOxEyaw6ZEfQ4",
    authDomain: "fir-9-733f2.firebaseapp.com",
    projectId: "fir-9-733f2",
    storageBucket: "fir-9-733f2.firebasestorage.app",
    messagingSenderId: "993169752250",
    appId: "1:993169752250:web:e3ff0606bd13c072060283"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection reference
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
    .then(snapshot => {
        let books = [];
        snapshot.docs.forEach(doc => {
            books.push({ ...doc.data(), id: doc.id })
        })
    })