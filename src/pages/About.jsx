import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  const styles = {
    pageWrapper: {
      background: "linear-gradient(135deg, #2b6cff 0%, #7c4dff 100%)",
      minHeight: "100vh",
      paddingBottom: "50px"
    },
    glassCard: {
      background: "rgba(255, 255, 255, 0.98)",
      borderRadius: "16px",
      padding: "3rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
    },
    sectionTitle: {
      borderLeft: "4px solid #0d6efd",
      paddingLeft: "15px",
      marginBottom: "1.5rem",
      fontWeight: "700"
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <div className="container py-5">
        <div style={styles.glassCard}>
          
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">About CampusPulse</h1>
            <div className="mx-auto" style={{ width: "80px", height: "4px", background: "#0d6efd" }}></div>
            <p className="lead text-secondary mt-4">
              An official repository dedicated to documenting and sharing academic 
              competition experiences for the student community.
            </p>
          </div>

          <div className="row g-5">
            {/* Mission Section */}
            <div className="col-lg-6">
              <h3 style={styles.sectionTitle}>Our Mission</h3>
              <p className="text-muted text-justify">
                CampusPulse serves as a structured platform designed to bridge the knowledge gap 
                between senior participants and aspiring students. We aim to formalize the 
                exchange of technical strategies, fostering a culture of continuous learning and 
                excellence in hackathons, project exhibitions, and professional presentations.
              </p>
            </div>

            {/* Project Overview */}
            <div className="col-lg-6">
              <h3 style={styles.sectionTitle}>Project Overview</h3>
              <p className="text-muted text-justify">
                Developed as a Final Year Information Technology initiative, this platform 
                is engineered to provide a secure, scalable, and faculty-moderated environment. 
                Our goal is to ensure that every shared experience meets institutional 
                standards of quality and authenticity.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-5 pt-5 border-top">
            <h3 style={styles.sectionTitle}>System Capabilities</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
              {['Secure Authentication', 'Faculty Moderation', 'Advanced Content Search', 
                'Interactive Engagement', 'Personalized Dashboard', 'Real-time Analytics'].map((item, i) => (
                <div key={i} className="col">
                  <div className="p-3 border rounded bg-light text-center">
                    <small className="fw-bold text-dark">{item}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-5 pt-4 text-center border-top">
            <p className="mb-2"><strong>Technologies:</strong> React.js • Firebase • Bootstrap 5 • React Router</p>
            <p className="text-muted small">
              © 2026 CampusPulse | Designed & Developed by Om Borse
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;