import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNiXrvnidqqcast4n3MPN6IoID_F_kV00",
  authDomain: "mobile-auth-a345e.firebaseapp.com",
  projectId: "mobile-auth-a345e",
  storageBucket: "mobile-auth-a345e.appspot.com",
  messagingSenderId: "881417394511",
  appId: "1:881417394511:web:288fdf6847b2e28f728d3a",
  measurementId: "G-ZVPVVWTD94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;