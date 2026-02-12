// Firebase Compatibility Build (No ES Modules needed for file://)

const firebaseConfig = {
    apiKey: "AIzaSyAHhHMKZsQF2WjorAG-GiqBNoIwnamZF48",
    authDomain: "movimento-auxilia-brasil.firebaseapp.com",
    projectId: "movimento-auxilia-brasil",
    storageBucket: "movimento-auxilia-brasil.firebasestorage.app",
    messagingSenderId: "858126334486",
    appId: "1:858126334486:web:8b11a65d4103f488735337",
    measurementId: "G-35PC2DE4WW"
};

// Initialize Firebase (Global Namespace)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const analytics = firebase.analytics();

// Make available globally
window.db = db;
window.collection = (db, col) => db.collection(col);
window.getDocs = (query) => query.get();
// Note: Compat syntax is different: db.collection("users").get(). SDK 8 style.