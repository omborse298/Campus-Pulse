import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
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
    toast.error("Story Rejected ❌"); loadStories();
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
            <h2 className="fw-bold display-6 mb-2">
              Faculty Review Dashboard
            </h2>

            <p className="text-muted fs-5">
              Review, approve and manage student competition stories.
            </p>
          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div className="card border-0 shadow-sm rounded-4 text-center h-100">
              <div className="card-body py-4">
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

            <div className="card border-0 shadow-sm rounded-4 text-center h-100">
              <div className="card-body py-4">
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

            <div className="card border-0 shadow-sm rounded-4 text-center h-100">
              <div className="card-body py-4">
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
              className="form-control form-control-lg rounded-pill shadow-sm"
              placeholder="Search by student, competition or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {filteredStories.length === 0 ? (

          <div className="text-center py-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"
              width="90"
              className="mb-3"
              alt=""
            />

            <h4 className="fw-bold">
              All Stories Reviewed
            </h4>

            <p className="text-muted">
              There are no pending stories waiting for approval.
            </p>
          </div>

        ) : (

          <div className="row">

            {filteredStories.map((story) => (

              <div
                key={story.id}
                className="col-lg-4 col-md-6 mb-4"
              >

                <div
                  className="card border-0 rounded-4 shadow-sm h-100"
                  style={{
                    transition: "0.25s",
                    minHeight: "360px"
                  }}
                >
                  <div className="card-body d-flex flex-column">
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

                    <p
                      className="text-muted flex-grow-1"
                      style={{
                        minHeight: "95px",
                        lineHeight: "1.7"
                      }}
                    >
                      {(story.experience || "").length > 120
                        ? (story.experience || "").substring(0, 120) + "..."
                        : story.experience}
                    </p>
                  </div>

                  <div className="card-footer bg-white border-0 pt-0">
                    <Link
                      className="btn btn-outline-primary btn-sm rounded-pill me-2 px-3"
                      to={`/story/${story.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-success btn-sm rounded-pill px-3 me-2" onClick={() => handleApprove(story.id)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger btn-sm rounded-pill px-3" onClick={() => handleReject(story.id)}
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