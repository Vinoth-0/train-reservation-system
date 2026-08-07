import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTrain, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search Trains" },
  { to: "/my-bookings", label: "My Bookings" },
  { to: "/profile", label: "Profile" },
  { to: "/admin", label: "Admin" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
        <div className="logo-icon-wrap">
          <FaTrain />
        </div>

        <span className="logo-wordmark">
          A<span>Train</span>
        </span>
      </NavLink>

      {/* Navigation Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {NAV_LINKS.filter((link) => {
          if (link.to === "/admin") {
            return user?.role === "ADMIN";
          }
          return true;
        }).map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} end={to === "/"} onClick={closeMenu}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="wel">Welcome, {user.name}</span>

            <button className="nav-login-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="nav-login-btn" onClick={closeMenu}>
            <FaUserCircle style={{ fontSize: 15 }} />
            Login
          </NavLink>
        )}

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
