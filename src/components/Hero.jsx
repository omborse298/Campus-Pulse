import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left Side */}

          <div className="col-lg-6 text-white">

            <span className="badge bg-light text-primary px-3 py-2 rounded-pill mb-4">
              🚀 India's Student Success Platform
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "4rem",
                lineHeight: "1.15",
              }}
            >
              Share.
              <br />
              Learn.
              <br />
              Inspire.
            </h1>

            <p
              className="lead"
              style={{
                maxWidth: "600px",
              }}
            >
              CampusPulse is a platform where students share real competition
              experiences, helping juniors prepare better for hackathons,
              technical events, paper presentations and project competitions.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">

              <Link
                to="/stories"
                className="btn btn-light btn-lg rounded-pill px-4"
              >
                📖 Explore Stories
              </Link>

              <Link
                to="/write"
                className="btn btn-outline-light btn-lg rounded-pill px-4"
              >
                ✍ Share Story
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 mt-5 mt-lg-0">

            <div className="card border-0 shadow-lg rounded-4">

              <div className="card-body p-5">

                <h2 className="fw-bold text-primary mb-4">
                  Why CampusPulse?
                </h2>

                <div className="mb-4">

                  <h5>📖 Real Student Experiences</h5>

                  <p className="text-muted mb-0">
                    Learn directly from students who participated in real
                    competitions.
                  </p>

                </div>

                <hr />

                <div className="mb-4">

                  <h5>🏆 Faculty Approved Stories</h5>

                  <p className="text-muted mb-0">
                    Every published story is reviewed by faculty for quality
                    and authenticity.
                  </p>

                </div>

                <hr />

                <div className="mb-4">

                  <h5>💡 Learn from Seniors</h5>

                  <p className="text-muted mb-0">
                    Discover tips, mistakes to avoid and winning strategies
                    from experienced participants.
                  </p>

                </div>

                <hr />

                <div>

                  <h5>🚀 Prepare with Confidence</h5>

                  <p className="text-muted mb-0">
                    Build confidence before your next hackathon, project
                    competition or technical event.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;