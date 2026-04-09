import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx9lr0fq8rZdvIqRMHmiWz-_GNOAZLJ8o",
  authDomain: "mondialeautoecoleweb.firebaseapp.com",
  projectId: "mondialeautoecoleweb",
  storageBucket: "mondialeautoecoleweb.firebasestorage.app",
  messagingSenderId: "597082064486",
  appId: "1:597082064486:web:904bd88834f2197a0e4fa7",
  measurementId: "G-MZN5BRXYJJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
