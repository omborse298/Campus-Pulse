import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";


function Navbar() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [role, setRole] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const db = getFirestore();

                const userDoc = await getDoc(doc(db, "users", currentUser.uid));

                if (userDoc.exists()) {
                    setRole(userDoc.data().role);
                }
            } else {
                setRole("");
            }
        });

        return () => unsubscribe();
    }, []);
    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top">
            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-3 text-primary"
                    to="/"
                >
                    <FaBookOpen className="me-2" />
                    CampusPulse
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/stories">
                                Stories
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/categories">
                                Categories
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/about">
                                About
                            </Link>
                        </li>

                    </ul>

                    {user ? (
                        <>
                            <Link
                                to={role === "faculty" ? "/faculty-dashboard" : "/student-dashboard"}
                                className="btn btn-success rounded-pill ms-3 px-4"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                className="btn btn-outline-primary rounded-pill ms-2 px-4"
                            >
                                Profile
                            </Link>

                            <button
                                className="btn btn-danger rounded-pill ms-2 px-4"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="btn btn-outline-primary rounded-pill ms-3 px-4"
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="btn btn-primary rounded-pill ms-2 px-4"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;