import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryCard from "../components/CategoryCard";
import { 
  FaTrophy, FaLaptopCode, FaProjectDiagram, 
  FaFileAlt, FaRobot, FaPalette 
} from "react-icons/fa";

function Categories() {
  const categoryData = [
    { icon: <FaTrophy />, title: "Hackathons", color: "warning" },
    { icon: <FaLaptopCode />, title: "Technical Competitions", color: "primary" },
    { icon: <FaProjectDiagram />, title: "Project Competitions", color: "success" },
    { icon: <FaFileAlt />, title: "Paper Presentations", color: "danger" },
    { icon: <FaRobot />, title: "Robotics Competitions", color: "secondary" },
    { icon: <FaPalette />, title: "Design Competitions", color: "dark" },
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 text-dark">Explore Categories</h1>
          <p className="text-muted fs-5">Select a domain to discover real student experiences.</p>
          <div className="mx-auto mt-3 rounded-pill" style={{ width: "100px", height: "6px", background: "linear-gradient(to right, #0d6efd, #6f42c1)" }}></div>
        </div>

        {/* Grid Section */}
        <div className="row g-4 justify-content-center">
          {categoryData.map((cat, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="h-100 p-1 rounded-4 shadow-sm border-0 bg-white hover-zoom">
                <CategoryCard item={cat} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Categories;