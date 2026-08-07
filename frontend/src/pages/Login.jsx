import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTrain,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import UserService from "../services/UserService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await UserService.login(formData);
  
      localStorage.setItem("user", JSON.stringify(response.data));

      toast.success("Login Successful");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Invalid Email or Password");
      } else {
        toast.error("Unable to connect to the server");
      }
    }
  };

  const features = [
    "Real-time seat availability",
    "Instant e-ticket on booking",
    "Secure payment gateway",
    "Live train status updates",
  ];

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Panel */}
        <div className="login-left">
          <div className="login-brand">
            <FaTrain className="brand-icon" />
            <span>ATrain</span>
          </div>

          <div className="login-left-body">
            <h2>Your journey starts here</h2>
            <p>
              Book tickets, track trains, and manage your bookings — all in one
              place.
            </p>
            <ul className="features-list">
              {features.map((f) => (
                <li key={f}>
                  <FaCheck className="check-icon" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="login-footer">© 2026 ATrain. All rights reserved.</p>
        </div>

        {/* Right Form */}
        <div className="login-right">
          <div className="form-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email address</label>
              <div className="input-wrap">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrap">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="#">Forgot password?</Link>
            </div>

            <button className="login-btn" type="submit">
              Sign in
            </button>
          </form>

          <div className="divider">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <button className="google-btn">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
