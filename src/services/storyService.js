import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

// ==========================================
// ADD STORY
// ==========================================

export const addStory = async (storyData) => {
  try {
    const docRef = await addDoc(collection(db, "stories"), {
      ...storyData,
      status: "pending",
      likes: 0,
      comments: [],
      createdAt: serverTimestamp(),
    });

    return docRef;
  } catch (error) {
    console.error("Error adding story:", error);
    throw error;
  }
};

// ==========================================
// GET STORIES OF LOGGED-IN USER
// ==========================================

export const getUserStories = async (userId) => {
  const q = query(
    collection(db, "stories"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ==========================================
// GET APPROVED STORIES
// ==========================================

export const getApprovedStories = async () => {
  const q = query(
    collection(db, "stories"),
    where("status", "==", "approved")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ==========================================
// GET PENDING STORIES
// ==========================================

export const getPendingStories = async () => {
  const q = query(
    collection(db, "stories"),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ==========================================
// GET STORY BY ID
// ==========================================

export const getStoryById = async (id) => {
  const storyRef = doc(db, "stories", id);

  const storySnap = await getDoc(storyRef);

  if (!storySnap.exists()) {
    return null;
  }

  return {
    id: storySnap.id,
    ...storySnap.data(),
  };
};

// ==========================================
// UPDATE STORY
// ==========================================

export const updateStory = async (id, updatedData) => {
  await updateDoc(doc(db, "stories", id), updatedData);
};

// ==========================================
// DELETE STORY
// ==========================================

export const deleteStory = async (id) => {
  await deleteDoc(doc(db, "stories", id));
};

// ==========================================
// APPROVE STORY
// ==========================================

export const approveStory = async (id) => {
  await updateDoc(doc(db, "stories", id), {
    status: "approved",
  });
};

// ==========================================
// REJECT STORY
// ==========================================

export const rejectStory = async (id) => {
  await updateDoc(doc(db, "stories", id), {
    status: "rejected",
  });
};

// ==========================================
// LIKE STORY
// ==========================================

export const likeStory = async (id) => {
  await updateDoc(doc(db, "stories", id), {
    likes: increment(1),
  });
};

// ==========================================
// ADD COMMENT
// ==========================================

export const addComment = async (storyId, comment) => {
  await updateDoc(doc(db, "stories", storyId), {
    comments: arrayUnion(comment),
  });
};

// ==========================================
// DASHBOARD COUNTS
// ==========================================

export const getApprovedCount = async (userId) => {
  const q = query(
    collection(db, "stories"),
    where("userId", "==", userId),
    where("status", "==", "approved")
  );

  return (await getDocs(q)).size;
};

export const getPendingCount = async (userId) => {
  const q = query(
    collection(db, "stories"),
    where("userId", "==", userId),
    where("status", "==", "pending")
  );

  return (await getDocs(q)).size;
};

export const getRejectedCount = async (userId) => {
  const q = query(
    collection(db, "stories"),
    where("userId", "==", userId),
    where("status", "==", "rejected")
  );

  return (await getDocs(q)).size;
};