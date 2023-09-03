// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLDi4cSUGm5-helQhLOZnabBp6P1hWMn0",
  authDomain: "otpproject-b5f35.firebaseapp.com",
  projectId: "otpproject-b5f35",
  storageBucket: "otpproject-b5f35.appspot.com",
  messagingSenderId: "254572624696",
  appId: "1:254572624696:web:efd7d1c29cf4cfad565fcd",
  measurementId: "G-85VN7YJLGS"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

