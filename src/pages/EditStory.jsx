import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getStoryById,
  updateStory,
} from "../services/storyService";

function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState({
    competition: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    const data = await getStoryById(id);
    setStory(data);
  };

  const handleChange = (e) => {
    setStory({
      ...story,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateStory(id, story);

    alert("Story Updated Successfully");

    navigate("/student-dashboard");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="card shadow border-0 rounded-4">

          <div className="card-body p-5">

            <h2 className="mb-4">
              Edit Story
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                className="form-control mb-3"
                name="competition"
                value={story.competition}
                onChange={handleChange}
                placeholder="Competition"
              />

              <input
                className="form-control mb-3"
                name="category"
                value={story.category}
                onChange={handleChange}
                placeholder="Category"
              />

              <textarea
                className="form-control mb-3"
                rows="5"
                name="description"
                value={story.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <button className="btn btn-primary">
                Update Story
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default EditStory;