import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserEdit, FaEnvelope, FaPhone, FaUser, FaSave, FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import UserService from "../services/UserService";
import "./Profile.css";

const FIELDS = [
  { icon: <FaUser />,    label: "Full Name",    name: "name",        type: "text"  },
  { icon: <FaEnvelope />,label: "Email",        name: "email",       type: "email" },
  { icon: <FaPhone />,   label: "Phone Number", name: "phoneNumber", type: "text"  },
];

function UpdateProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "", name: "", email: "", phoneNumber: "", role: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { name: user.name, email: user.email, phoneNumber: user.phoneNumber };
      const response = await UserService.updateUser(user.id, request);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar-wrap">
            <FaUserEdit className="profile-avatar" style={{ opacity: 0.18 }} />
          </div>
          <h1>Edit Profile</h1>
          <span className="profile-role-badge">Update your details below</span>
        </div>

        {/* Form body */}
        <div className="profile-body">
          <span className="profile-section-label">Personal Information</span>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-fields">
              {FIELDS.map(({ icon, label, name, type }) => (
                <div className="profile-form-group" key={name}>
                  <div className="profile-item-icon">{icon}</div>
                  <div className="profile-form-field-inner">
                    <label className="profile-item-label">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={user[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <hr className="profile-divider" />

            <div className="profile-buttons">
              <button type="submit" className="profile-btn btn-edit">
                <FaSave /> Save Changes
              </button>
              <button
                type="button"
                className="profile-btn btn-password"
                onClick={() => navigate("/profile")}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UpdateProfile;