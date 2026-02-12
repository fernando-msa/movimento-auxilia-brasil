// Firebase Config Example
// Replace these values with your Firebase Project Configuration
// 1. Rename this file to 'firebase-config.js'
// 2. Add your keys below

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "G-YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (Global Namespace)
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const analytics = firebase.analytics();
    const auth = firebase.auth();
    const storage = firebase.storage();

    // Make available globally
    window.db = db;
    window.auth = auth;
    window.storage = storage;
    window.collection = (db, col) => db.collection(col);
    window.getDocs = (query) => query.get();
} else {
    console.error("Firebase SDK not loaded.");
}
