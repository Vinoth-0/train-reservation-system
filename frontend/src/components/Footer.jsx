import { Link } from "react-router-dom";
import {
  FaTrain,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import "./Footer.css";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search Trains" },
  { to: "/my-bookings", label: "My Bookings" },
  { to: "/profile", label: "Profile" },
];

const TRAVEL_LINKS = [
  { to: "/search?class=SL", label: "Sleeper Class" },
  { to: "/search?class=3A", label: "AC 3-Tier" },
  { to: "/search?class=2A", label: "AC 2-Tier" },
  { to: "/search?class=1A", label: "AC First Class" },
];

const SOCIALS = [
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaTwitter />, href: "#", label: "Twitter" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <FaTrain />
            </div>
            <span className="footer-logo-name">
              A<span>Train</span>
            </span>
          </Link>

          <p className="footer-tagline">
            Book train tickets across India — fast, secure, and always the best
            price.
          </p>

          <div className="footer-contact-item">
            <FaEnvelope />
            vinoth132005@atrain.in
          </div>

          <div className="footer-contact-item">
            <FaPhoneAlt />
            +91 79040 74245
          </div>

          <div className="footer-contact-item">
            <FaClock />
            Available 24 × 7
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Navigate</h4>
          {QUICK_LINKS.map(({ to, label }) => (
            <Link to={to} key={to}>{label}</Link>
          ))}
        </div>

        {/* Travel */}
        <div className="footer-col">
          <h4>Travel Classes</h4>
          {TRAVEL_LINKS.map(({ to, label }) => (
            <Link to={to} key={to}>{label}</Link>
          ))}
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>

      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} ATrain Reservation System. All rights reserved.
        </p>

        <div className="social-icons">
          {SOCIALS.map(({ icon, href, label }) => (
            <a href={href} key={label} aria-label={label}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;