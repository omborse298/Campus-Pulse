import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";

// Create user profile
export const createUserProfile = async (data) => {
  await addDoc(collection(db, "users"), data);
};

// Get user profile by UID
export const getUserProfile = async (uid) => {
  const q = query(
    collection(db, "users"),
    where("uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
};