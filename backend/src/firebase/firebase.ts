import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCIMviedkMP5RgWGnC0dRuzKTiPtfuJw9M",
    authDomain: "income-tracker-88b7c.firebaseapp.com",
    projectId: "income-tracker-88b7c",
    storageBucket: "income-tracker-88b7c.appspot.com",
    messagingSenderId: "195510333902",
    appId: "1:195510333902:web:4bb17bb0ca1f4833283b9f",
    measurementId: "G-3JFPC1J83G",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
