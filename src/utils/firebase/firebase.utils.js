import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUp-58C0oHnLQ4_Sl0GhYVc8IraWb5Lgk",
  authDomain: "crown-clothing-db-ab139.firebaseapp.com",
  projectId: "crown-clothing-db-ab139",
  storageBucket: "crown-clothing-db-ab139.appspot.com",
  messagingSenderId: "876192818835",
  appId: "1:876192818835:web:976ceee6b674a8f5bf0f66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export async function createUserDocumentFromAuth(
  userAuth,
  additionalInformation = {}
) {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
}

export async function createAuthUserWithEmailAndPassword(email, password) {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailandPassword(email, password) {
  if (!email || !password) return;

  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}
export function signOutUser() {
  signOut(auth);
}

export function onAuthStateChangedListener(callback) {
  if (!callback) return;
  return onAuthStateChanged(auth, callback);
}
