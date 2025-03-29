import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlsYG00nmq2hOAMn16tgI7ggS-DKiHv0I",
  authDomain: "my-auth-app-59c59.firebaseapp.com",
  projectId: "my-auth-app-59c59",
  storageBucket: "my-auth-app-59c59.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "163485268784",
  appId: "1:163485268784:web:cb2653124a13cfb97ee6f5",
  measurementId: "G-7Y3ZV7VLXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, analytics, db };
