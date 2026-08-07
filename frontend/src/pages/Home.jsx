import { Link } from "react-router-dom";
import {
  FaTrain,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaArrowRight,
} from "react-icons/fa";
import "./Home.css";

const FEATURES = [
  {
    icon: <FaTrain />,
    title: "500+ Trains",
    desc: "Tickets for express, mail, and passenger trains across India.",
  },
  {
    icon: <FaClock />,
    title: "Instant Confirmation",
    desc: "Ticket confirmed in seconds — no waiting, no uncertainty.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    desc: "PCI-compliant checkout. Your card data never touches our servers.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Best Fares",
    desc: "Real-time pricing with no hidden convenience fees.",
  },
];

const ROUTES = [
  { from: "Chennai", to: "Bengaluru", duration: "6 hrs · Daily" },
  { from: "Delhi", to: "Mumbai", duration: "16 hrs · Daily" },
  { from: "Hyderabad", to: "Chennai", duration: "13 hrs · Daily" },
  { from: "Kolkata", to: "Delhi", duration: "17 hrs · Daily" },
  { from: "Mumbai", to: "Chennai", duration: "14 hrs · Daily" },
  { from: "Bengaluru", to: "Hyderabad", duration: "10 hrs · Daily" },
  { from: "Chennai", to: "Kolkata", duration: "24 hrs · Daily" },
  { from: "Delhi", to: "Bengaluru", duration: "20 hrs · Daily" },
];

function Home() {
  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Trusted Railway Booking Platform</div>

          <h1>
            Your journey
            <br />
            <span>starts here</span>
          </h1>

          <p>
            Every mile tells a story. Book train tickets across India — fast,
            secure, and always the best price.
          </p>

          <div className="hero-actions">
            <Link to="/search" className="btn-primary">
              Search Trains <FaArrowRight style={{ fontSize: 13 }} />
            </Link>
            <Link to="/register" className="btn-ghost">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="stats-strip">
        <div className="stat-item">
          <strong>500+</strong>
          <span>Train routes</span>
        </div>
        <div className="stat-item">
          <strong>2M+</strong>
          <span>Happy passengers</span>
        </div>
        <div className="stat-item">
          <strong>99.8%</strong>
          <span>On-time accuracy</span>
        </div>
        <div className="stat-item">
          <strong>24/7</strong>
          <span>Customer support</span>
        </div>
      </div>

      {/* ── Search Box ── */}
      <section className="search-section">
        <div className="search-box">
          <div className="search-header">
            <div className="search-header-icon">
              <FaTrain />
            </div>
            <h2>Find Your Train</h2>
          </div>

          <div className="search-body">
            <div className="search-grid">
              <div className="field-group">
                <label>From</label>
                <input type="text" placeholder="e.g. Chennai Central" />
              </div>

              <div className="field-group">
                <label>To</label>
                <input type="text" placeholder="e.g. New Delhi" />
              </div>

              <div className="field-group">
                <label>Date</label>
                <input type="date" />
              </div>

              <div className="field-group">
                <label>Class</label>
                <select>
                  <option>All Classes</option>
                  <option>Sleeper (SL)</option>
                  <option>AC 3-Tier (3A)</option>
                  <option>AC 2-Tier (2A)</option>
                  <option>AC First (1A)</option>
                </select>
              </div>

              <button className="search-btn">Search →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <span className="section-label">Why ATrain</span>
        <h2 className="section-title">Travel smarter, not harder</h2>

        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Routes ── */}
      <section className="routes">
        <span className="section-label">Popular Routes</span>
        <h2 className="section-title">Where will you go next?</h2>

        <div className="route-grid">
          {ROUTES.map((r) => (
            <Link to="/search" className="route-card" key={r.from + r.to}>
              <div className="route-icon">
                <FaMapMarkedAlt />
              </div>
              <div className="route-text">
                <h3>
                  {r.from} → {r.to}
                </h3>
                <span>{r.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Offer ── */}
      <section className="offer">
        <span className="offer-eyebrow">Limited Time</span>
        <h2>20% off your first booking</h2>
        <p>
          Create an account today and save instantly on any route across India.
        </p>
        <Link to="/register" className="btn-primary">
          Claim Offer <FaArrowRight style={{ fontSize: 13 }} />
        </Link>
      </section>
    </div>
  );
}

export default Home;