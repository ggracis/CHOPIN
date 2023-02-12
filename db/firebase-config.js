// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXjQ71yhIklU8owlUw2etsPpqW2Rw-vsU",
  authDomain: "chopin-ch.firebaseapp.com",
  projectId: "chopin-ch",
  storageBucket: "chopin-ch.appspot.com",
  messagingSenderId: "681932595111",
  appId: "1:681932595111:web:69128d9ce56d1f5d412082",
  measurementId: "G-LN4C44V2R6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
