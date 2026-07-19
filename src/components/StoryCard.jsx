import { FaHeart, FaComment, FaArrowRight, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { likeStory } from "../services/storyService";

function StoryCard({ story }) {
  const handleLike = async () => {
    await likeStory(story.id);
    window.location.reload();
  };

  return (
    <div
      className="card border-0 shadow-lg rounded-4 h-100 overflow-hidden"
      style={{
        transition: "0.3s",
        minHeight: "390px"
      }}
    >
      <div className="bg-primary text-white p-3">
        <div className="d-flex justify-content-between align-items-center">

          <span className="badge bg-light text-primary">
            {story.category}
          </span>

          <span className="badge bg-warning text-dark">
            <FaTrophy className="me-1" />
            {story.result || "Participant"}
          </span>

        </div>

        <h5 className="fw-bold mt-3 mb-2">
          {story.competition}
        </h5>

        <small>
          {story.userName || story.name} • {story.studentClass || story.year}
        </small>
      </div>

      <div
        className="card-body d-flex flex-column"
        style={{ minHeight: "170px" }}
      >
        <p className="text-muted flex-grow-1">
          {story.experience
            ? story.experience.length > 140
              ? story.experience.substring(0, 140) + "..."
              : story.experience
            : "No experience available."}
        </p>
      </div>

      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-between align-items-center">

          <div>

            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={handleLike}
            >
              <FaHeart className="me-1" />
              {story.likes || 0}
            </button>

            <button className="btn btn-sm btn-outline-primary">
              <FaComment className="me-1" />
              {(story.comments || []).length}
            </button>

          </div>

          <Link
            to={`/story/${story.id}`}
            className="btn btn-primary rounded-pill"
          >
            Read
            <FaArrowRight className="ms-2" />
          </Link>

        </div>
      </div>
    </div>
  );
}

export default StoryCard;