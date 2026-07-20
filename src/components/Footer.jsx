import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-5">

        <div className="row">

          {/* Brand */}
          <div className="col-lg-5 mb-4">

            <h3 className="fw-bold">
              CampusPulse
            </h3>

            <p className="text-secondary">
              Learn from real competition experiences shared by students.
              Discover opportunities, prepare better, and inspire others.
            </p>

          </div>


          {/* Links */}
          <div className="col-lg-3 mb-4">

            <h5 className="fw-bold">
              Quick Links
            </h5>

            <ul className="list-unstyled mt-3">

              <li className="mb-2">
                Home
              </li>

              <li className="mb-2">
                Explore Stories
              </li>

              <li className="mb-2">
                Categories
              </li>

              <li>
                Share Story
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div className="col-lg-4">

            <h5 className="fw-bold">
              Connect With Us
            </h5>

            <div className="mt-3">

              <p>
                <FaEnvelope className="me-2" />
                campuspulse@gmail.com
              </p>

              <p>
                <FaLinkedin className="me-2" />
                LinkedIn
              </p>

              <p>
                <FaGithub className="me-2" />
                GitHub
              </p>

            </div>

          </div>

        </div>

      </div>


      <div className="border-top border-secondary text-center py-3">

        <small>
          © 2026 CampusPulse. Built for Student Community.
        </small>

      </div>

    </footer>
  );
}

export default Footer;