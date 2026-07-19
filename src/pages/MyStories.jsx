import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaThumbsUp,
  FaComments,
  FaEdit,
  FaEye,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserStories } from "../services/storyService";

function MyStories() {
  const [stories, setStories] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const data = await getUserStories(user.uid);
    setStories(data);
  };

  const getBadge = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="py-5"
        style={{
          background: "#f8f9fc",
          minHeight: "90vh",
        }}
      >
        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              📚 My Stories
            </h2>

            <p className="text-muted">
              Manage all your submitted competition experiences.
            </p>

          </div>

          {stories.length === 0 ? (

            <div className="card border-0 shadow rounded-4">

              <div className="card-body text-center py-5">

                <h3>📝</h3>

                <h5>No Stories Yet</h5>

                <p className="text-muted">
                  You haven't shared any competition stories.
                </p>

                <Link
                  to="/write"
                  className="btn btn-primary rounded-pill px-4"
                >
                  Share Your First Story
                </Link>

              </div>

            </div>

          ) : (

            <div className="row">

              {stories.map((story) => (

                <div
                  className="col-lg-6 mb-4"
                  key={story.id}
                >

                  <div className="card shadow border-0 rounded-4 h-100">

                    <div className="card-body">

                      <div className="d-flex justify-content-between align-items-center">

                        <span
                          className={`badge bg-${getBadge(story.status)}`}
                        >
                          {story.status.toUpperCase()}
                        </span>

                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          {story.createdAt?.seconds
                            ? new Date(
                                story.createdAt.seconds * 1000
                              ).toLocaleDateString()
                            : "Today"}
                        </small>

                      </div>

                      <h4 className="fw-bold mt-3">
                        {story.competition}
                      </h4>

                      <span className="badge bg-primary mb-3">
                        {story.category}
                      </span>

                      <p className="text-muted">
                        {(story.experience || "").substring(0, 150)}...
                      </p>

                      <hr />

                      <div className="d-flex justify-content-between">

                        <small>
                          <FaThumbsUp className="text-primary me-1" />
                          {story.likes || 0} Likes
                        </small>

                        <small>
                          <FaComments className="text-success me-1" />
                          {story.comments?.length || 0} Comments
                        </small>

                      </div>

                    </div>

                    <div className="card-footer bg-white border-0 d-flex justify-content-between">

                      <Link
                        to={`/story/${story.id}`}
                        className="btn btn-outline-primary rounded-pill"
                      >
                        <FaEye className="me-2" />
                        View
                      </Link>

                      <Link
                        to={`/edit-story/${story.id}`}
                        className="btn btn-primary rounded-pill"
                      >
                        <FaEdit className="me-2" />
                        Edit
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default MyStories;