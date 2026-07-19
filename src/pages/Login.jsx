import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";

// Ensure these exist in your src/components folder
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await loginUser(form.email, form.password);

      // 1. Check for Faculty Access
      if (user.role === "faculty" && user.email === "facultyitdepart@gmail.com") {
        toast.success("Welcome, Faculty Member!");
        navigate("/faculty-dashboard");
        return; // Stops execution, prevents unauthorized popup
      }

      // 2. Check for Student Access
      if (user.role === "student") {
        toast.success("Welcome to CampusPulse!");
        navigate("/student-dashboard");
        return; // Stops execution, prevents unauthorized popup
      }

      // 3. Invalid Role Fallback
      toast.error("Unauthorized access for this account.");
      setLoading(false);

    } catch (err) {
      toast.error(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="bg-white shadow-sm border" style={{ borderRadius: "6px" }}>
              <div className="p-4 border-bottom text-center">
                <div className="text-primary fs-2 mb-2"><FaUserGraduate /></div>
                <h4 className="fw-bold m-0">CampusPulse Login</h4>
              </div>

              <div className="p-5">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0 bg-white"><FaEnvelope className="text-secondary" /></span>
                      <input type="email" className="form-control border-start-0" name="email" placeholder="name@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-end-0 bg-white"><FaLock className="text-secondary" /></span>
                      <input type={showPassword ? "text" : "password"} className="form-control border-start-0" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
                      <button type="button" className="btn btn-outline-secondary border-start-0" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                    {loading ? "AUTHENTICATING..." : "SIGN IN"}
                  </button>
                </form>

                <div className="mt-4 pt-4 border-top text-center">
                  <p className="text-muted small">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register Here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;