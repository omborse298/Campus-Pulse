import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoryCard from "../components/StoryCard";
import Loading from "../components/Loading";
import { getApprovedStories } from "../services/storyService";

function ExploreStories() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);

      const data = await getApprovedStories();

      setStories(data);
    } catch (error) {
      console.error("Error loading stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.competition
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      story.userName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      story.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      story.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Explore Success Stories
          </h2>

          <p className="text-muted">
            Browse inspiring stories shared by students.
          </p>
        </div>

        <div className="row mb-5">

          <div className="col-md-8 mb-3">

            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by competition or student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <select
              className="form-select form-select-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
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

        <div className="row">

          {filteredStories.length === 0 ? (

            <div className="col-12">

              <div className="alert alert-info text-center">
                No stories found.
              </div>

            </div>

          ) : (

            filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))

          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ExploreStories;