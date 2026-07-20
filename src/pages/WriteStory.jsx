import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addStory } from "../services/storyService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
        toast.error("Please login first.");
        return;
      }

       const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();
      await addStory({
        ...formData,
        userId: user.uid,
        userName: userData.name, // Student's actual name
      });

      toast.success("Story submitted successfully ✅");

      navigate("/student-dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit story");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">

          <span className="badge bg-primary px-4 py-2 rounded-pill mb-3">
            Student Experience
          </span>

          <h1 className="fw-bold display-5">
            Share Your Competition Story
          </h1>

          <p className="text-muted fs-5">
            Help juniors learn from your real experience and inspire future participants.
          </p>

        </div>

        <div className="card border-0 shadow rounded-4">

          <div className="card-body p-4 p-lg-5">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-lg-6 mb-4">

                  <label className="fw-semibold mb-2">
                    Competition Name
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    placeholder="Enter competition name"
                    name="competition"
                    value={formData.competition}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-lg-6 mb-4">

                  <label className="fw-semibold mb-2">
                    Category
                  </label>

                  <select
                    className="form-select form-select-lg rounded-3"
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

              <div className="mb-4">

                <label className="fw-semibold mb-2">
                  Your Experience
                </label>

                <textarea
                  className="form-control rounded-3"
                  rows="6"
                  placeholder="Describe your overall competition experience..."
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-4">

                <label className="fw-semibold mb-2">
                  Key Learnings
                </label>

                <textarea
                  className="form-control rounded-3"
                  rows="5"
                  placeholder="What important lessons did you learn?"
                  name="learning"
                  value={formData.learning}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-4">

                <label className="fw-semibold mb-2">
                  Advice for Learners
                </label>

                <textarea
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="Share tips for future participants..."
                  name="advice"
                  value={formData.advice}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="text-end">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
                >
                  Submit Story
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default WriteStory;