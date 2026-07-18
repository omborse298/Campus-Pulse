import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import StoryCard from "../components/StoryCard";
import { getApprovedStories } from "../services/storyService";

function Home() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const data = await getApprovedStories();
    setStories(data);
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa" }}>
      <Navbar />
      <Hero />

      {/* Stats Section - Moved up to provide immediate value */}
      <div style={{ marginTop: "-50px", position: "relative", zIndex: 2 }}>
        <div className="container">
          <Stats />
        </div>
      </div>

      <main className="container py-5">
        
        <Categories />
        
        <div className="my-5">
            <HowItWorks />
        </div>

        {/* Latest Stories Section - Professional Grid */}
        <section className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "#2d3436" }}>Latest Insights</h2>
              <p className="text-muted">Faculty-verified experiences from our community.</p>
            </div>
            <a href="/stories" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
              Explore All Stories
            </a>
          </div>

          <div className="row g-4">
            {stories.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No stories available at this time.</p>
              </div>
            ) : (
              stories.map((story) => (
                <div className="col-md-4" key={story.id}>
                    <div className="h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-all">
                        <StoryCard story={story} />
                    </div>
                </div>
              ))
            )}
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
}

export default Home;