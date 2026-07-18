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
        <div className="container py-5">
          <div className="alert alert-warning">
            Story not found.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="card shadow-lg border-0 rounded-4">

          <div className="card-body p-5">

            <span className="badge bg-primary">
              {story.category}
            </span>

            <h2 className="fw-bold mt-3">
              {story.competition}
            </h2>

            <p className="text-muted">
              By {story.userName}
            </p>

            <hr />

            <h4>
              <FaBookOpen className="me-2 text-primary" />
              Experience
            </h4>

            <p>{story.experience}</p>

            <hr />

            <h4>
              <FaLightbulb className="me-2 text-warning" />
              Key Learnings
            </h4>

            <p>{story.learning}</p>

            <hr />

            <h4>
              <FaUserGraduate className="me-2 text-success" />
              Advice
            </h4>

            <p>{story.advice}</p>

            <hr />

            <button
              className="btn btn-outline-danger me-3"
              onClick={handleLike}
            >
              ❤️ {story.likes || 0}
            </button>

            <hr className="my-4" />

            <h4>Comments</h4>

            <div className="input-group mb-4">

              <input
                className="form-control"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                className="btn btn-primary"
                onClick={handleComment}
              >
                <FaPaperPlane />
              </button>

            </div>

            {(story.comments || []).map((item, index) => (

              <div
                key={index}
                className="border rounded-3 p-3 mb-3"
              >
                <h6>{item.user}</h6>

                <p>{item.text}</p>

                <small className="text-muted">
                  {item.time}
                </small>

              </div>

            ))}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default StoryDetails;