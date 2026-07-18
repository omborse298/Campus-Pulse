import { FaHeart, FaComment, FaArrowRight, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { likeStory } from "../services/storyService";

function StoryCard({ story }) {
  const handleLike = async () => {
    await likeStory(story.id);
    window.location.reload();
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="card border-0 shadow-lg rounded-4 h-100 overflow-hidden"
        style={{ transition: "0.3s" }}
      >
        <div className="bg-primary text-white p-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-light text-primary">
              {story.category}
            </span>

            <span className="badge bg-warning text-dark">
              <FaTrophy className="me-1" />
              {story.result}
            </span>
          </div>

          <h5 className="fw-bold mt-3">
            {story.competition}
          </h5>

          <small>
            {story.name} • {story.year}
          </small>
        </div>

        <div className="card-body">
          <p className="text-muted">
  {story.description
    ? story.description.length > 120
      ? story.description.substring(0, 120) + "..."
      : story.description
    : "No description available."}
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
                {story.likes}
              </button>

              <button className="btn btn-sm btn-outline-primary">
                <FaComment className="me-1" />
                {story.comments}
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
    </div>
  );
}

export default StoryCard;