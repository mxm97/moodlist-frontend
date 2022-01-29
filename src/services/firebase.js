import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4sZtC6wE_tyMOM7pj831RXElXyYU9eRM",
    authDomain: "unit-3-project-wallpaper-radio.firebaseapp.com",
    projectId: "unit-3-project-wallpaper-radio",
    storageBucket: "unit-3-project-wallpaper-radio.appspot.com",
    messagingSenderId: "40845278595",
    appId: "1:40845278595:web:c8ed4a5e7cb1260e700ab6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

function login() {
    return auth.signInWithPopup(provider);
}

function logout() {
    return auth.signOut();
}

export { auth, login, logout };