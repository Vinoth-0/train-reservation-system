import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTrain, FaUsers, FaTicketAlt, FaRupeeSign,
  FaPlusCircle, FaEdit, FaClipboardList, FaUserCog,
} from "react-icons/fa";
import TrainService from "../services/TrainService";
import UserService from "../services/UserService";
import "./AdminDashboard.css";

const ACTIONS = [
  {
    to: "/admin/add-train",
    icon: <FaPlusCircle />,
    label: "Add Train",
    sub: "Register a new route",
  },
  {
    to: "/admin/view-train",
    icon: <FaEdit />,
    label: "Manage Trains",
    sub: "Edit schedule or fare",
  },
  {
    icon: <FaClipboardList />,
    label: "View Bookings",
    sub: "Coming soon",
    comingSoon: true,
  },
  {
    icon: <FaUserCog />,
    label: "Manage Users",
    sub: "Coming soon",
    comingSoon: true,
  },
];

function AdminDashboard() {
  const [trainCount, setTrainCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [trainsRes, usersRes] = await Promise.all([
        TrainService.getAllTrains(),
        UserService.getAllUsers(),
      ]);
      setTrainCount(trainsRes.data.length);
      setUserCount(usersRes.data.length);
    } catch (error) {
      toast.error("Unable to load dashboard stats.");
    } finally {
      setLoading(false);
    }
  };

  const STATS = [
    {
      key: "trains",
      title: "Total Trains",
      value: loading ? "—" : trainCount,
      icon: <FaTrain />,
    },
    {
      key: "users",
      title: "Registered Users",
      value: loading ? "—" : userCount,
      icon: <FaUsers />,
    },
    {
      key: "bookings",
      title: "Total Bookings",
      value: "Coming soon",
      icon: <FaTicketAlt />,
      placeholder: true,
    },
    {
      key: "revenue",
      title: "Total Revenue",
      value: "Coming soon",
      icon: <FaRupeeSign />,
      placeholder: true,
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="section-label">ATrain Admin</span>
          <h1>Dashboard</h1>
        </div>
        <span className="admin-meta">{today}</span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map((s) => (
          <div className={`stat-card ${s.key}`} key={s.key}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-content">
              <span className={`stat-value${s.placeholder ? " placeholder" : ""}`}>
                {s.value}
              </span>
              <span className="stat-title">{s.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="quick-actions-header">
          <h2>Quick Actions</h2>
          <span className="section-eyebrow">Admin Tools</span>
        </div>

        <div className="action-grid">
          {ACTIONS.map((a) =>
            a.comingSoon ? (
              <div className="action-card disabled" key={a.label}>
                <div className="action-icon">{a.icon}</div>
                <div>
                  <span className="action-label">{a.label}</span>
                  <span className="action-sub">{a.sub}</span>
                </div>
                <span className="coming-soon-badge">Soon</span>
              </div>
            ) : (
              <Link to={a.to} className="action-card" key={a.label}>
                <div className="action-icon">{a.icon}</div>
                <div>
                  <span className="action-label">{a.label}</span>
                  <span className="action-sub">{a.sub}</span>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-card">
        <div className="recent-card-header">
          <h2>Recent Activity</h2>
          <span className="section-eyebrow">Live</span>
        </div>

        <div className="empty-activity">
          <FaClipboardList className="empty-activity-icon" />
          <p>Activity feed will appear here once bookings go live.</p>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;