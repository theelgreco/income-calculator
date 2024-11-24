// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIMviedkMP5RgWGnC0dRuzKTiPtfuJw9M",
    authDomain: "income-tracker-88b7c.firebaseapp.com",
    projectId: "income-tracker-88b7c",
    storageBucket: "income-tracker-88b7c.appspot.com",
    messagingSenderId: "195510333902",
    appId: "1:195510333902:web:4bb17bb0ca1f4833283b9f",
    measurementId: "G-3JFPC1J83G",
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
