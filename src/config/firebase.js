// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFNcLJB7dFh1kM63njqrsQeM9-oFPjTc0",
  authDomain: "movies-70c39.firebaseapp.com",
  projectId: "movies-70c39",
  storageBucket: "movies-70c39.appspot.com",
  messagingSenderId: "182664218445",
  appId: "1:182664218445:web:8e8067e0a14e4c53fd9904",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
