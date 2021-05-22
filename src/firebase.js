import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5X5ndmtAw1Tp3acyltCGvPS_mU1caNOk",
    authDomain: "linkedin-clone-7ac38.firebaseapp.com",
    projectId: "linkedin-clone-7ac38",
    storageBucket: "linkedin-clone-7ac38.appspot.com",
    messagingSenderId: "37209073311",
    appId: "1:37209073311:web:0f12e1bb55f54cd5bae4aa",
    measurementId: "G-G3X0FW0DS5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };

export default db;