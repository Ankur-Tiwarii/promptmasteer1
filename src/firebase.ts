import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import {
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCvrkvh5NdU84tlYtcZZ_1jrhQdTSsrUc",
  authDomain: "promptmasterai-cedd2.firebaseapp.com",
  projectId: "promptmasterai-cedd2",
  storageBucket: "promptmasterai-cedd2.firebasestorage.app",
  messagingSenderId: "19877184296",
  appId: "1:19877184296:web:7d4fdcd94d7d285dae061d",
  measurementId: "G-QQNLSQ7TL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (safe-guarded for non-browser environments)
try {
  getAnalytics(app);
} catch {
  // Ignore analytics errors in non-browser or unsupported environments
}

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Ensure auth state persists in browser
setPersistence(auth, browserLocalPersistence).catch(() => {
  // Ignore persistence errors; auth will still work with default settings
});

// Firestore
export const db = getFirestore(app);
export const serverTime = serverTimestamp;


