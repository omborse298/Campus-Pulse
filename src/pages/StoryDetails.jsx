import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaPaperPlane,
  FaBookOpen,
  FaLightbulb,
  FaUserGraduate,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  getStoryById,
  likeStory,
  addComment,
} from "../services/storyService";

function StoryDetails() {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    const data = await getStoryById(id);
    setStory(data);
  };

  const handleLike = async () => {
    await likeStory(id);
    loadStory();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    await addComment(id, {
      user: "Anonymous",
      text: comment,
      time: new Date().toLocaleString(),
    });

    setComment("");
    loadStory();
  };

  if (!story) {
    return (
      <>
        <Navbar />

        <div className="container py-5 text-center">
          <h2 className="fw-bold">Story Not Found</h2>

          <p className="text-muted">
            The requested story does not exist or has been removed.
          </p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div
          className="card border-0 rounded-4 shadow-sm"
          style={{ overflow: "hidden" }}
        >

          <div className="card-body p-4 p-lg-5">

            <div className="d-flex justify-content-between align-items-start flex-wrap">

              <div>

                <span className="badge bg-primary px-3 py-2 rounded-pill">
                  {story.category}
                </span>

                <h2 className="fw-bold mt-3 mb-2">
                  {story.competition}
                </h2>

                <p className="text-muted mb-0">
                  Shared by <strong>{story.userName}</strong>
                </p>

              </div>

              <div className="mt-3 mt-lg-0">

                <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                  Faculty Approved
                </span>

              </div>

            </div>

            <hr className="my-4" />

            <h4 className="fw-bold mb-3">
              <FaBookOpen className="me-2 text-primary" />
              Experience
            </h4>

            <p
              className="text-secondary"
              style={{
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              {story.experience}
            </p>

            <hr className="my-4" />

            <h4 className="fw-bold mb-3">
              <FaLightbulb className="me-2 text-warning" />
              Key Learnings
            </h4>

            <p
              className="text-secondary"
              style={{
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              {story.learning}
            </p>

            <hr className="my-4" />

            <h4 className="fw-bold mb-3">
              <FaUserGraduate className="me-2 text-success" />
              Advice for Learners
            </h4>

            <p
              className="text-secondary"
              style={{
                lineHeight: "1.9",
                textAlign: "justify",
              }}
            >
              {story.advice}
            </p>

            <hr className="my-4" />

            <button
              className="btn btn-outline-danger rounded-pill px-4"
              onClick={handleLike}
            >
              <FaHeart className="me-2" />
              {story.likes || 0} Likes
            </button>

            <hr className="my-5" />

            <h4 className="fw-bold mb-4">
              Community Discussion
            </h4>

            <div className="input-group mb-4">

              <input
                className="form-control rounded-start-pill py-3"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                className="btn btn-primary rounded-end-pill px-4"
                onClick={handleComment}
              >
                <FaPaperPlane />
              </button>

            </div>

            {(story.comments || []).length === 0 ? (

              <div className="text-center py-4">

                <p className="text-muted mb-0">
                  No comments yet. Be the first to comment.
                </p>

              </div>

            ) : (

              story.comments.map((item, index) => (

                <div
                  key={index}
                  className="card border-0 shadow-sm rounded-4 mb-3"
                >

                  <div className="card-body">

                    <h6 className="fw-bold mb-2">
                      {item.user}
                    </h6>

                    <p className="mb-2">
                      {item.text}
                    </p>

                    <small className="text-muted">
                      {item.time}
                    </small>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default StoryDetails;