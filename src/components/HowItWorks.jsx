import { FaBookOpen, FaLightbulb, FaUsers, FaPen } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaBookOpen size={40} className="text-primary" />,
      title: "Read Stories",
      desc: "Explore real experiences shared by students from various competitions.",
    },
    {
      icon: <FaLightbulb size={40} className="text-warning" />,
      title: "Learn",
      desc: "Understand the competition format, preparation tips, and key learnings.",
    },
    {
      icon: <FaUsers size={40} className="text-success" />,
      title: "Participate",
      desc: "Apply your knowledge and confidently take part in upcoming competitions.",
    },
    {
      icon: <FaPen size={40} className="text-danger" />,
      title: "Share Your Story",
      desc: "Help the next generation by sharing your own competition experience.",
    },
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">How CampusPulse Works</h2>
        <p className="text-muted">
          A simple cycle of learning, participating, and inspiring others.
        </p>
      </div>

      <div className="row">
        {steps.map((step, index) => (
          <div className="col-lg-3 col-md-6 mb-4" key={index}>
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 text-center">
              <div className="mb-3">{step.icon}</div>
              <h5 className="fw-bold">{step.title}</h5>
              <p className="text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;