import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <Navbar />

      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <h1
          className="display-1 fw-bold text-primary"
          style={{ fontSize: "7rem" }}
        >
          404
        </h1>

        <h2 className="fw-bold mt-3">
          Oops! Page Not Found
        </h2>

        <p className="text-muted text-center mt-3" style={{ maxWidth: "600px" }}>
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to CampusPulse.
        </p>

        <Link
          to="/"
          className="btn btn-primary btn-lg rounded-pill px-5 mt-4"
        >
          Back to Home
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default NotFound;