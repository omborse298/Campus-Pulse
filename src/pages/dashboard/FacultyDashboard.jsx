import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

import {
  getPendingStories,
  approveStory,
  rejectStory,
} from "../../services/storyService";

function FacultyDashboard() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const data = await getPendingStories();
    setStories(data);
  };

  const handleApprove = async (id) => {
    await approveStory(id);
    toast.success("Story Approved ✅");
    loadStories();
  };

  const handleReject = async (id) => {
    await rejectStory(id);
toast.error("Story Rejected ❌");    loadStories();
  };

  const filteredStories = stories.filter((story) => {
    return (
      story.competition
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      story.userName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      story.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold">
              Faculty Dashboard
            </h2>

            <p className="text-muted">
              Review and manage student stories.
            </p>
          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 text-center">

              <div className="card-body">

                <h2 className="text-primary">
                  {stories.length}
                </h2>

                <p className="mb-0">
                  Pending Stories
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 text-center">

              <div className="card-body">

                <h2 className="text-success">
                  Faculty
                </h2>

                <p className="mb-0">
                  Review Panel
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 text-center">

              <div className="card-body">

                <h2 className="text-warning">
                  CampusPulse
                </h2>

                <p className="mb-0">
                  Story Approval System
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="row mb-4">

          <div className="col-lg-6">

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by student, competition or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {filteredStories.length === 0 ? (

          <div className="alert alert-success text-center">

            <h5>
              🎉 No Pending Stories Found
            </h5>

          </div>

        ) : (

          <div className="row">

            {filteredStories.map((story) => (

              <div
                key={story.id}
                className="col-lg-4 col-md-6 mb-4"
              >

                <div className="card shadow border-0 rounded-4 h-100">

                  <div className="card-body">

                    <span className="badge bg-primary">
                      {story.category}
                    </span>

                    <h5 className="fw-bold mt-3">
                      {story.competition}
                    </h5>

                    <p>
                      <strong>Student :</strong>{" "}
                      {story.userName}
                    </p>

                    <p className="text-muted">
                      {(story.experience || "").substring(0, 120)}...
                    </p>

                  </div>

                  <div className="card-footer bg-white border-0">

                    <Link
                      to={`/story/${story.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(story.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(story.id)}
                    >
                      Reject
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

export default FacultyDashboard;