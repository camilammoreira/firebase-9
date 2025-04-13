import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    getDocs, addDoc, deleteDoc, updateDoc, doc,
    query, where,
    orderBy, serverTimestamp
} from "firebase/firestore";
import {
    getAuth, createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
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
const auth = getAuth();

// collection reference
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt")) // (optional) 2°: where("author", "==", "rodrigo patto")

// get collection data
onSnapshot(q, (snapshot) => {
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
        author: addForm.author.value.trim(),
        createdAt: serverTimestamp()
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

// update item
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", e => {
    e.preventDefault();

    const docRef = doc(db, "books", updateForm.updateFormId.value)

    updateDoc(docRef, {
        title: updateForm.newTitle.value,
        author: updateForm.newAuthor.value
    }).then(() => {
        updateForm.reset();
    }).catch(err => console.log(err.message))
})

// sign up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log("user created:", cred.user);
            signupForm.reset();
        })
        .catch(err => {
            console.log(err.message);
        })
})

// log out
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => console.log("user logged out"))
        .catch(err => console.log(err.message))
})

// log in
const loginForm = document.querySelector(".login")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, email, password)
        .then(cred => console.log("user logged in:", cred.user))
        .catch(err => console.log(err.message))
})