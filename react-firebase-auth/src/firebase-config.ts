import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "367227857458",
  appId: "",
  measurementId: "G-TQ0HRC9G5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getAuth(app)
