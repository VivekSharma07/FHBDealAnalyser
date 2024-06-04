// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQX_GujmX4cIZmmSLJ5y0pQ4UqhzinhnU",
  authDomain: "fhb-deal-analyser.firebaseapp.com",
  projectId: "fhb-deal-analyser",
  storageBucket: "fhb-deal-analyser.appspot.com",
  messagingSenderId: "783776543460",
  appId: "1:783776543460:web:19df9c0f14ec4f8f07b2f1",
  measurementId: "G-QFB90H29S8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
