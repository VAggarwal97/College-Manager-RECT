// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDEoCpvAR1UVTDu3bihzEidC89_-qTpD_I",
    authDomain: "c-manager-d2c4b.firebaseapp.com",
    projectId: "c-manager-d2c4b",
    storageBucket: "c-manager-d2c4b.appspot.com",
    messagingSenderId: "178888785018",
    appId: "1:178888785018:web:986b8b52776e1aecb34fc3",
    measurementId: "G-07E4F62GYM"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { auth, firestore };
export { storage };