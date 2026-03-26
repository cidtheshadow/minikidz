// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";

// These are placeholders. 
// You must go to the Firebase Console -> Project Settings and replace these with your actual keys.
const firebaseConfig = {
  apiKey: "AIzaSyB-EXAMPLE-KEY",
  authDomain: "minikidzz-app.firebaseapp.com",
  projectId: "minikidzz-app",
  storageBucket: "minikidzz-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const setupRecaptcha = (divId) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, divId, {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
  }
  return window.recaptchaVerifier;
};
