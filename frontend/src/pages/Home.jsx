import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrain,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaArrowRight,
} from "react-icons/fa";
import TrainService from "../services/TrainService";
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

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState({ source: "", destination: "" });
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  useEffect(() => {
    fetchPopularRoutes();
  }, []);

  const fetchPopularRoutes = async () => {
    setLoadingRoutes(true);
    try {
      const response = await TrainService.getAllTrains();
      const trains = response.data;

      // Group trains by source→destination pair, count how many
      // trains run each route, and surface the most common ones.
      const counts = {};
      trains.forEach((t) => {
        const key = `${t.source}|${t.destination}`;
        counts[key] = (counts[key] || 0) + 1;
      });

      const routes = Object.entries(counts)
        .map(([key, count]) => {
          const [from, to] = key.split("|");
          return { from, to, count };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

      setPopularRoutes(routes);
    } catch (error) {
      setPopularRoutes([]);
    } finally {
      setLoadingRoutes(false);
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.source) params.set("source", search.source);
    if (search.destination) params.set("destination", search.destination);
    navigate(`/search?${params.toString()}`);
  };

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
            <form className="search-grid" onSubmit={handleSearch}>
              <div className="field-group">
                <label>From</label>
                <input
                  type="text"
                  name="source"
                  placeholder="e.g. Chennai"
                  value={search.source}
                  onChange={handleChange}
                />
              </div>

              <div className="field-group">
                <label>To</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g. New Delhi"
                  value={search.destination}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="search-btn">
                Search →
              </button>
            </form>
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

        {loadingRoutes ? (
          <p className="routes-status">Loading routes…</p>
        ) : popularRoutes.length > 0 ? (
          <div className="route-grid">
            {popularRoutes.map((r) => (
              <Link
                to={`/search?source=${encodeURIComponent(r.from)}&destination=${encodeURIComponent(r.to)}`}
                className="route-card"
                key={r.from + r.to}
              >
                <div className="route-icon">
                  <FaMapMarkedAlt />
                </div>
                <div className="route-text">
                  <h3>
                    {r.from} → {r.to}
                  </h3>
                  <span>{r.count} train{r.count > 1 ? "s" : ""} available</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="routes-status">
            No routes yet — check back once trains are added.
          </p>
        )}
      </section>

      {/* ── Offer ── */}
      <section className="offer">
        <span className="offer-eyebrow">Limited Time</span>
        <h2>20% off your first booking</h2>
        <p>
          Use code <strong>FIRST20</strong> at checkout to get 20% off your first train ticket booking.
          <br />Hurry, offer valid until the end of the month!
        </p>
      </section>
    </div>
  );
}

export default Home;