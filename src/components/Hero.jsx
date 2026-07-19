import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="py-5"
      style={{
        background:
          "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)",
        minHeight: "82vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">

        <div className="row align-items-center g-5">

          {/* Left Section */}

          <div className="col-lg-6 text-white">

            <span
              className="badge bg-white text-primary px-4 py-2 rounded-pill mb-4 shadow-sm"
              style={{
                fontSize: "0.95rem",
              }}
            >
              🚀 India's Student Competition Experience Platform
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "clamp(2.8rem,6vw,4.3rem)",
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
              className="lead text-white-50"
              style={{
                maxWidth: "560px",
                lineHeight: "1.8",
              }}
            >
              CampusPulse connects students through authentic competition
              experiences, enabling juniors to prepare confidently for
              hackathons, project competitions, technical events, paper
              presentations and startup challenges.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-5">

              <Link
                to="/stories"
                className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow"
              >
                📖 Explore Stories
              </Link>

              <Link
                to="/write"
                className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold"
              >
                ✍ Share Experience
              </Link>

            </div>

          </div>

          {/* Right Section */}

          <div className="col-lg-6">

            <div
              className="card border-0 rounded-4 shadow-lg"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >

              <div className="card-body p-5">

                <h2
                  className="fw-bold text-primary mb-4"
                >
                  Why CampusPulse?
                </h2>

                <div className="d-flex mb-4">

                  <div className="me-3 fs-3">
                    📖
                  </div>

                  <div>

                    <h5 className="fw-semibold">
                      Real Student Experiences
                    </h5>

                    <p className="text-muted mb-0">
                      Learn from authentic experiences shared by students who
                      have participated in national and state-level
                      competitions.
                    </p>

                  </div>

                </div>

                <hr />

                <div className="d-flex my-4">

                  <div className="me-3 fs-3">
                    🏆
                  </div>

                  <div>

                    <h5 className="fw-semibold">
                      Faculty Verified Stories
                    </h5>

                    <p className="text-muted mb-0">
                      Every published story is reviewed and approved by
                      faculty members to ensure quality and credibility.
                    </p>

                  </div>

                </div>

                <hr />

                <div className="d-flex my-4">

                  <div className="me-3 fs-3">
                    💡
                  </div>

                  <div>

                    <h5 className="fw-semibold">
                      Practical Learning
                    </h5>

                    <p className="text-muted mb-0">
                      Understand preparation strategies, common mistakes,
                      interview rounds and winning approaches from seniors.
                    </p>

                  </div>

                </div>

                <hr />

                <div className="d-flex">

                  <div className="me-3 fs-3">
                    🚀
                  </div>

                  <div>

                    <h5 className="fw-semibold">
                      Build Confidence
                    </h5>

                    <p className="text-muted mb-0">
                      Prepare with confidence before participating in your
                      next competition and maximize your chances of success.
                    </p>

                  </div>

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