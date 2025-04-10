import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    getDocs, addDoc, deleteDoc, doc
} from "firebase/firestore";
import {
    getAuth
} from "firebase/auth"

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
const auth = getAuth()

// collection reference
const colRef = collection(db, "books");

// get collection data
onSnapshot(colRef, (snapshot) => {
    let books = [];
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// add item
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", e => {
    e.preventDefault();

    addDoc(colRef, {
        title: addForm.title.value.trim(),
        author: addForm.author.value.trim()
    })
        .then(() => addForm.reset())
})

// delete item
const delForm = document.querySelector(".del");
delForm.addEventListener("submit", e => {
    e.preventDefault();

    const docRef = doc(db, "books", delForm.id.value.trim());
    deleteDoc(docRef)
        .then(() => delForm.reset())
})