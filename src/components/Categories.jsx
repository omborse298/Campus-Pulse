import {
  FaTrophy,
  FaLaptopCode,
  FaProjectDiagram,
  FaFileAlt,
  FaBrain,
  FaRobot,
  FaPalette,
  FaChalkboardTeacher,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaTrophy size={35} />,
    title: "Hackathons",
    color: "warning",
  },
  {
    icon: <FaLaptopCode size={35} />,
    title: "Technical Competitions",
    color: "primary",
  },
  {
    icon: <FaProjectDiagram size={35} />,
    title: "Project Competitions",
    color: "success",
  },
  {
    icon: <FaFileAlt size={35} />,
    title: "Paper Presentations",
    color: "danger",
  },
  {
    icon: <FaBrain size={35} />,
    title: "Quiz Competitions",
    color: "info",
  },
  {
    icon: <FaRobot size={35} />,
    title: "Robotics Competitions",
    color: "secondary",
  },
  {
    icon: <FaPalette size={35} />,
    title: "Poster / Design",
    color: "dark",
  },
  {
    icon: <FaChalkboardTeacher size={35} />,
    title: "Workshops & Seminars",
    color: "primary",
  },
];

function Categories() {
  return (
    <section className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Explore Categories</h2>
        <p className="text-muted">
          Browse stories based on competition type.
        </p>
      </div>

      <div className="row">

        {categories.map((item, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>

            <div className="card border-0 shadow rounded-4 h-100 text-center p-4">

              <div className={`text-${item.color} mb-3`}>
                {item.icon}
              </div>

              <h5 className="fw-bold">
                {item.title}
              </h5>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;