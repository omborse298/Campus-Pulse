import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

// =====================================
// Register User
// =====================================
export const registerUser = async (name, prn, email, password, studentClass) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    prn,
    email,
    studentClass,
    role: "student", // Explicitly set to student
    createdAt: new Date(),
  });

  return user;
};

// =====================================
// Login User
// =====================================
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);
      // We throw a very specific error here that matches what Login.jsx expects
      throw new Error("Account profile is incomplete.");
    }

    const userData = userSnap.data();

    // Return the combined object
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      ...userData,
      // Ensure role is returned, defaulting to 'student' if for some reason it's undefined
      role: userData.role || "student" 
    };
  } catch (error) {
    // Re-throw the error so Login.jsx can catch it and show the toast
    throw error;
  }
};

// =====================================
// Logout User
// =====================================
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};