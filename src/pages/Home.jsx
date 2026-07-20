import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    try {
      const data = await getApprovedStories();
      setStories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ background: "#f8f9fc" }}>
        <Hero />

        {/* Stats */}
        <div
          className="container"
          style={{
            marginTop: "-60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Stats />
        </div>

        <main className="container py-5">

          {/* Categories */}
          <section className="mb-5">
            <Categories />
          </section>

          {/* How it Works */}
          <section className="mb-5">
            <HowItWorks />
          </section>

          {/* Latest Stories */}
          <section className="py-4">

            <div className="row align-items-center mb-4">
              

              <div className="col-lg-8">

                <h2
                  className="fw-bold mb-2"
                  style={{
                    color: "#2d3436",
                  }}
                >
                  Latest Approved Stories
                </h2>

                <p className="text-muted mb-0">
                  Discover faculty-approved competition experiences
                  shared by students across various technical events.
                </p>

              </div>

              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

                <Link
                  to="/stories"
                  className="btn btn-primary rounded-pill px-4 py-2 shadow-sm"
                >
                  Explore All Stories →
                </Link>

              </div>

            </div>

            {stories.length === 0 ? (

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body py-5 text-center">

                  <h5 className="fw-semibold">
                    No Stories Available
                  </h5>

                  <p className="text-muted mb-0">
                    Faculty-approved stories will appear here.
                  </p>

                </div>

              </div>

            ) : (

              <div className="row">

                {stories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                  />
                ))}


              </div>

            )}

            

          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}

export default Home;