import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBHZKwXlcqu9l8v2c9XoMWL9I4H3LEXBLA",
  authDomain: "database-crud-d7a98.firebaseapp.com",
  projectId: "database-crud-d7a98",
  storageBucket: "database-crud-d7a98.appspot.com",
  messagingSenderId: "919995741207",
  appId: "1:919995741207:web:63ac0e522d0abd3da81852",
  measurementId: "G-18M7Y2QQEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const dB=getFirestore(app);
export const storage=getStorage(app);