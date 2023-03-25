// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsmrnWV8dughZ8ZIxyoICiFkKGknxyd9I",
  authDomain: "mpcrypto-71091.firebaseapp.com",
  projectId: "mpcrypto-71091",
  storageBucket: "mpcrypto-71091.appspot.com",
  messagingSenderId: "931651808832",
  appId: "1:931651808832:web:6ab67446eb2ceb89fcb9a5",
  measurementId: "G-896GS9NCYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    const name = result.user.displayName;
    const email = result.user.email;
    const photoUrl = result.user.photoURL;
    const emailVerified = result.user.emailVerified;


    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('photoUrl', photoUrl);
    localStorage.setItem('emailVerified', emailVerified);
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

export const signOut = () => {
  auth.signOut().then(() => {
    // Sign-out successful.
    localStorage.clear();
  }).catch((error) => {
    // An error happened.
  });
}
