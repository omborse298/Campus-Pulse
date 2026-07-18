import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaIdCard, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", prn: "", studentClass: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form.name, form.prn, form.email, form.password, form.studentClass);
      toast.success("Student Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* Official Navy Background */}
      <div className="py-5" style={{ minHeight: "90vh", background: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-5">
                  <div className="text-center mb-5">
                    {/* Official Blue Icon Badge */}
                    <div className="rounded-3 mx-auto d-flex align-items-center justify-content-center"
                      style={{ width: "70px", height: "70px", fontSize: "30px", background: "#eef2ff", color: "#0d6efd" }}>
                      <FaUserGraduate />
                    </div>
                    <h2 className="fw-bold mt-3 text-dark">Student Registration</h2>
                    <p className="text-muted">Register for your official CampusPulse account</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <label className="fw-bold small text-secondary mb-1">Full Name</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-light border-end-0"><FaUser size={14} className="text-muted" /></span>
                      <input type="text" className="form-control border-start-0 bg-light" name="name" value={form.name} onChange={handleChange} required />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label className="fw-bold small text-secondary mb-1">PRN Number</label>
                        <input type="text" className="form-control mb-3 bg-light" name="prn" value={form.prn} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="fw-bold small text-secondary mb-1">Class</label>
                        <select className="form-select mb-3 bg-light" name="studentClass" value={form.studentClass} onChange={handleChange} required>
                          <option value="">Select Class</option>
                          {["IF-FY (Cray)", "IF-FY (Param)", "IF-SY (Cray)", "IF-SY (Param)", "IF-TY (Cray)", "IF-TY (Param)"].map(cls => <option key={cls}>{cls}</option>)}
                        </select>
                      </div>
                    </div>

                    <label className="fw-bold small text-secondary mb-1">Email Address</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-light border-end-0"><FaEnvelope size={14} className="text-muted" /></span>
                      <input type="email" className="form-control border-start-0 bg-light" name="email" value={form.email} onChange={handleChange} required />
                    </div>

                    <label className="fw-bold small text-secondary mb-1">Password</label>
                    <div className="input-group mb-4">
                      <span className="input-group-text bg-light border-end-0"><FaLock size={14} className="text-muted" /></span>
                      <input type={showPassword ? "text" : "password"} className="form-control border-0 bg-light" name="password" value={form.password} onChange={handleChange} required />
                      <button type="button" className="btn btn-light border-0" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* Official Blue Button */}
                    <button className="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-2 fw-bold" disabled={loading}>
                      {loading ? "Processing..." : "REGISTER NOW"}
                    </button>
                  </form>

                  <hr className="my-4" />
                  <div className="text-center">
                    <p className="text-muted">Already have an account? <Link to="/login" className="fw-bold text-primary text-decoration-none">Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;