// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_BLIz6Hi7toBDqWBAjykfpUFX3uajcuQ",
  authDomain: "payhx-cbc08.firebaseapp.com",
  projectId: "payhx-cbc08",
  storageBucket: "payhx-cbc08.appspot.com",
  messagingSenderId: "931809729784",
  appId: "1:931809729784:web:2cfe76b67ecf241dbc2f0d",
  measurementId: "G-CVBYLXZF80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };