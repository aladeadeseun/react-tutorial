import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByeJa2twmhr9DfA8HxNidIz7_uk4UY8JU",
  authDomain: "reaact-firebase--auth.firebaseapp.com",
  projectId: "reaact-firebase--auth",
  storageBucket: "reaact-firebase--auth.appspot.com",
  messagingSenderId: "367227857458",
  appId: "1:367227857458:web:405a87d423db415b012a2b",
  measurementId: "G-TQ0HRC9G5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getAuth(app)