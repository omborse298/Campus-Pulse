import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPendingStories } from "../services/storyService";

function MyStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const data = await getPendingStories();
    setStories(data);
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="fw-bold mb-4">
          My Stories
        </h2>

        {stories.length === 0 ? (
          <div className="alert alert-info">
            No stories submitted yet.
          </div>
        ) : (
          <div className="row">

            {stories.map((story) => (
              <div className="col-md-6 mb-4" key={story.id}>

                <div className="card shadow border-0 h-100">

                  <div className="card-body">

                    <h4>{story.title}</h4>

                    <p>{story.content}</p>

                    <span className="badge bg-warning">
                      {story.status}
                    </span>

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

export default MyStories;