import {
  FaHeart,
  FaComment,
  FaArrowRight,
  FaTrophy,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { likeStory } from "../services/storyService";
import "./StoryCard.css";

function StoryCard({ story }) {
  const handleLike = async () => {
    await likeStory(story.id);
    window.location.reload();
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 mb-4">
      <div className="story-card">

        <div className="story-header"></div>

        <div className="story-content">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <span className="badge rounded-pill bg-primary px-3 py-2">
              {story.category}
            </span>

            <span className="badge rounded-pill bg-warning text-dark px-3 py-2">
              <FaTrophy className="me-1" />
              {story.result || "Participant"}
            </span>

          </div>

          <h4 className="story-title">
            {story.competition}
          </h4>

          <div className="story-author">

            <FaUserCircle className="me-2 text-primary" />

            
              <span className="fw-semibold">
                {story.userName || "Anonymous Student"}
                
                     
            </span>

          </div>

          <div className="story-date">

            <FaCalendarAlt className="me-2" />

            <small>
              {story.createdAt
                ? new Date(
                  story.createdAt.seconds * 1000
                ).toLocaleDateString()
                : "Recently"}
            </small>

          </div>

          <p className="story-description">

            {story.experience
              ? story.experience.length > 170
                ? story.experience.substring(0, 120) + "..."
                : story.experience
              : "No experience available."}

          </p>

        </div>

        <div className="story-footer">

          <div>

            <button
              className="btn btn-light me-2"
              onClick={handleLike}
            >
              <FaHeart className="text-danger me-1" />
              {story.likes || 0}
            </button>

            <button className="btn btn-light">
              <FaComment className="text-primary me-1" />
              {(story.comments || []).length}
            </button>

          </div>

          <Link
            to={`/story/${story.id}`}
            className="btn btn-primary rounded-pill px-4"
          >
            Read Story
            <FaArrowRight className="ms-2" />
          </Link>

        </div>

      </div>
    </div>
  );
}

export default StoryCard;