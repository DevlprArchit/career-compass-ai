import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile,
  User
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq1zFsKRUVDOCdsB1uaW0hRiYaWd-zw_o",
  authDomain: "airesume-75ee5.firebaseapp.com",
  projectId: "airesume-75ee5",
  storageBucket: "airesume-75ee5.firebasestorage.app",
  messagingSenderId: "982937004908",
  appId: "1:982937004908:web:82bb2070c1545b9e862149",
  measurementId: "G-E6YRJ1F0XH"
};

// Initialize Firebase safely (avoid multiple initializations in Next.js)
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);

export async function signInWithGooglePopup(): Promise<{ user: User | null; error: string | null }> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(firebaseAuth, provider);
    return { user: result.user, error: null };
  } catch (err: any) {
    console.warn("Firebase Google Auth Error:", err);
    let message = err.message || "Failed to sign in with Google.";
    if (err.code === "auth/unauthorized-domain" || message.includes("unauthorized-domain")) {
      message = "Google Sign-In: This domain/IP is not authorized in Firebase Console (Authentication > Settings > Authorized Domains). Please use the email form below or test on localhost:3000.";
    } else if (err.code === "auth/popup-closed-by-user") {
      message = "Google Sign-In popup was closed before completing.";
    } else if (err.code === "auth/popup-blocked") {
      message = "Popup was blocked by your browser. Please enable popups or use the email form.";
    }
    return { user: null, error: message };
  }
}

export async function signInWithEmail(email: string, pass: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, email, pass);
    return { user: result.user, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "Invalid email or password." };
  }
}

export async function signUpWithEmail(email: string, pass: string, name: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, pass);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }
    return { user: result.user, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "Failed to create account." };
  }
}

export async function logOutFirebase(): Promise<void> {
  try {
    await signOut(firebaseAuth);
  } catch (err) {
    console.error("Firebase SignOut Error:", err);
  }
}
