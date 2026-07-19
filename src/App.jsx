import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";

// Importing Components and Pages
import Home from "./pages/Home";
import ExploreStories from "./pages/ExploreStories";
import Categories from "./pages/Categories";
import WriteStory from "./pages/WriteStory";
import About from "./pages/About";
import StoryDetails from "./pages/StoryDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import MyStories from "./pages/MyStories";
import EditStory from "./pages/EditStory";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            setCurrentUser({
              uid: user.uid,
              ...userDoc.data(),
            });
          } else {
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stories" element={<ExploreStories />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/story/:id" element={<StoryDetails />} />

        {/* Student Routes */}

        <Route
          path="/write"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRole="student"
            >
              <WriteStory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-stories"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRole="student"
            >
              <MyStories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-story/:id"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRole="student"
            >
              <EditStory />
            </ProtectedRoute>
          }
        />

        {/* Profile - Accessible to any logged in user */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={currentUser}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRole="student"
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute
              user={currentUser}
              allowedRole="faculty"
            >
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;