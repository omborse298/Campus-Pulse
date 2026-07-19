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
      console.error(error);
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

      <div
        style={{
          background: "#f8f9fc",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">

          {/* Header */}

          <div className="text-center mb-5">

            <h1
              className="fw-bold"
              style={{
                color: "#2d3436",
              }}
            >
              Explore Stories
            </h1>

            <p
              className="text-muted fs-5"
              style={{
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Browse faculty-approved experiences shared by students
              who participated in hackathons, startup competitions,
              project exhibitions and technical events.
            </p>

          </div>

          {/* Search */}

          <div className="card border-0 shadow-sm rounded-4 mb-5">

            <div className="card-body p-4">

              <div className="row g-3">

                <div className="col-lg-8">

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="🔍 Search by competition or student..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

                <div className="col-lg-4">

                  <select
                    className="form-select form-select-lg"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >
                    <option value="All">
                      All Categories
                    </option>

                    <option value="Hackathon">
                      Hackathon
                    </option>

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

            </div>

          </div>

          {/* Result Count */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h5 className="fw-bold mb-0">
              Approved Stories
            </h5>

            <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
              {filteredStories.length} Stories
            </span>

          </div>

          {/* Stories */}

          {filteredStories.length === 0 ? (

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body text-center py-5">

                <h4 className="fw-bold">
                  No Stories Found
                </h4>

                <p className="text-muted mb-0">
                  Try changing the search keyword or category.
                </p>

              </div>

            </div>

          ) : (

            <div className="row">

              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                />
              ))}

            </div>

          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ExploreStories;