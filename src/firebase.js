import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1EFMoug_D_ZGJ-Kz_CnR_rTfJmvAm0SE",
    authDomain: "statsnba-7185b.firebaseapp.com",
    databaseURL: "https://statsnba-7185b.firebaseio.com",
    projectId: "statsnba-7185b",
    storageBucket: "statsnba-7185b.appspot.com",
    messagingSenderId: "273880553682",
    appId: "1:273880553682:web:fc8bf68efb83bf9b3b750b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const keep_session = firebase.auth.Auth.Persistence.SESSION;