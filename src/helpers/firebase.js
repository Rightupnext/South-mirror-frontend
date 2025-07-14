import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYui1GVWQZYZkVqHj_KOZz-urX3epMxaI",
    authDomain: "news-1a7d4.firebaseapp.com",
    projectId: "news-1a7d4",
    storageBucket: "news-1a7d4.appspot.com", // ✅ fixed this line
    messagingSenderId: "1054036097610",
    appId: "1:1054036097610:web:b5897c57982487c11484b3",
    measurementId: "G-5XQGZ5PJNB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }