import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaCalendarAlt,
  FaEdit,
  FaTrain,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./Profile.css";

const FIELDS = [
  { icon: <FaEnvelope />, label: "Email", key: "email" },
  { icon: <FaPhone />, label: "Phone", key: "phoneNumber" },
  { icon: <FaShieldAlt />, label: "Role", key: "role" },
  { icon: <FaCalendarAlt />, label: "Member Since", key: "createdAt" },
];

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      toast.error("Please login first.");
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-empty">
            <FaUserCircle className="profile-empty-icon" />
            <h3>No user found</h3>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar-wrap">
            <FaUserCircle className="profile-avatar" />
            <span className="profile-avatar-badge">
              <FaTrain />
            </span>
          </div>
          <h1>{user.name}</h1>
          <span className="profile-role-badge">ATrain Passenger</span>
        </div>

        {/* Body */}
        <div className="profile-body">
          <span className="profile-section-label">Account Details</span>

          <div className="profile-details">
            {FIELDS.map(({ icon, label, key }) =>
              user[key] ? (
                <div className="profile-item" key={key}>
                  <div className="profile-item-icon">{icon}</div>
                  <div className="profile-item-text">
                    <span className="profile-item-label">{label}</span>
                    <span className="profile-item-value">{user[key]}</span>
                  </div>
                </div>
              ) : null,
            )}
          </div>

          <hr className="profile-divider" />

          <div className="profile-buttons">
            <button
              className="profile-btn btn-edit"
              onClick={() => navigate("/update-profile")}
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
