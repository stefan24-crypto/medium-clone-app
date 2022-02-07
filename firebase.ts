import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDifux2wmJRVTqxXYDrVzNXORi76Z0Blas",
  authDomain: "medium-clone-app.firebaseapp.com",
  projectId: "medium-clone-app",
  storageBucket: "medium-clone-app.appspot.com",
  messagingSenderId: "446410622104",
  appId: "1:446410622104:web:62a501e835c9c60db77ced",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
