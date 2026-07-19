import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import {
  getUserStories,
  deleteStory,
  getApprovedCount,
  getPendingCount,
  getRejectedCount,
} from "../../services/storyService";

function StudentDashboard() {
  const auth = getAuth();

  const [stories, setStories] = useState([]);

  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const data = await getUserStories(user.uid);

    setStories(data);

    setApproved(await getApprovedCount(user.uid));
    setPending(await getPendingCount(user.uid));
    setRejected(await getRejectedCount(user.uid));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmDelete) return;

    await deleteStory(id);

    loadStories();
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold display-6 mb-2">
              Student Dashboard
            </h2>

            <p className="text-muted fs-5">
              Manage your competition stories and track their approval status.
            </p>
          </div>

          <Link
            to="/write"
            className="btn btn-primary rounded-pill px-4"
          >
            + Write Story
          </Link>

        </div>

        {/* Statistics Cards */}

        <div className="row mb-5">

          <div className="col-md-3 mb-3">
<div className="card border-0 shadow-sm rounded-4 text-center h-100">                 <div className="card-body">
              <h2 className="fw-bold mb-1">{stories.length}</h2>
              <p className="mb-0">Total Stories</p>
            </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
<div className="card border-0 shadow-sm rounded-4 bg-success text-white text-center h-100">              <div className="card-body py-4">         
                 <h2 className="fw-bold mb-1">{approved}</h2>
                <p className="mb-0">Approved</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
<div className="card border-0 shadow-sm rounded-4 bg-warning text-white text-center h-100">              <div className="card-body">
                <h2 className="fw-bold mb-1">{pending}</h2>
                <p className="mb-0">Pending</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
<div className="card border-0 shadow-sm rounded-4 bg-danger text-white text-center h-100">                <div className="card-body">
                <h2 className="fw-bold mb-1">{rejected}</h2>
                <p className="mb-0">Rejected</p>
              </div>
            </div>
          </div>

        </div>

        {stories.length === 0 ? (

          <div className="alert alert-info text-center">
            <h5>No stories found.</h5>

            <p>
              Click on <strong>Write Story</strong> to submit your first story.
            </p>
          </div>

        ) : (

          <div className="row">

            {stories.map((story) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={story.id}
              >

                <div className="card shadow border-0 rounded-4 h-100">

                  <div className="card-body">

                    <span className="badge bg-primary">
                      {story.category}
                    </span>

                    <h5 className="fw-bold mt-3">
                      {story.competition}
                    </h5>

                    <p className="text-muted">
                      {story.experience}
                    </p>

                    <p>
                      <strong>Status :</strong>{" "}

                      <span
                        className={`badge ${story.status === "approved"
                          ? "bg-success"
                          : story.status === "rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                          }`}
                      >
                        {story.status}
                      </span>
                    </p>

                  </div>

                  <div className="card-footer bg-white border-0">

                    <Link
                      to={`/story/${story.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      View
                    </Link>

                    {story.status === "pending" && (
                      <Link
                        to={`/edit-story/${story.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>
                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(story.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default StudentDashboard;