import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addStory } from "../services/storyService";

function WriteStory() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    competition: "",
    category: "",
    experience: "",
    learning: "",
    advice: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      await addStory({
        ...formData,
        userId: user.uid,
        userName: user.displayName || user.email,
      });

      toast.success("Story submitted successfully ✅");

      navigate("/student-dashboard");
    } catch (error) {
      console.error(error);
toast.error("Failed to submit story");    }
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">Share Your Competition Story</h1>
        <p className="text-secondary">
          Inspire other students with your experience.
        </p>
      </div>

      <div className="card shadow border-0 rounded-4 p-5">

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="fw-semibold">
                Competition Name
              </label>

              <input
                className="form-control"
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-semibold">
                Category
              </label>

              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Technical Competition">
                  Technical Competition
                </option>
                <option value="Project Competition">
                  Project Competition
                </option>
                <option value="Paper Presentation">
                  Paper Presentation
                </option>
              </select>
            </div>

          </div>

          <div className="mb-3">
            <label className="fw-semibold">
              Your Experience
            </label>

            <textarea
              className="form-control"
              rows="5"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold">
              Key Learnings
            </label>

            <textarea
              className="form-control"
              rows="4"
              name="learning"
              value={formData.learning}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="fw-semibold">
              Advice for Learners
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="advice"
              value={formData.advice}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary rounded-pill px-5"
          >
            Submit Story
          </button>

        </form>

      </div>

    </div>
  );
}

export default WriteStory;