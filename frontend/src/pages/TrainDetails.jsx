import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTrain, FaClock, FaMapMarkerAlt, FaChair, FaArrowRight,
} from "react-icons/fa";
import TrainService from "../services/TrainService";
import "./TrainDetails.css";

function TrainDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTrain = async () => {
    setLoading(true);
    try {
      const response = await TrainService.getTrainById(id);
      setTrain(response.data);
    } catch (error) {
      toast.error("Train not found.");
      navigate("/search");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="train-details-page">Loading…</div>;
  }

  if (!train) return null;

  const seatsLow = train.availableSeats < 20;

  return (
    <div className="train-details-page">

      {/* Banner */}
      <div className="train-banner">
        <div className="banner-icon-wrap">
          <FaTrain />
        </div>
        <div className="banner-text">
          <h1>{train.trainName}</h1>
          <div className="banner-meta">
            <span className="banner-badge">#{train.trainNumber}</span>
            <span className="banner-badge">
              <FaMapMarkerAlt /> {train.source} → {train.destination}
            </span>
          </div>
        </div>
      </div>

      {/* Journey details */}
      <div className="details-grid">

        <div className="info-card">
          <p className="info-card-title">Journey Details</p>

          <div className="info-row">
            <FaMapMarkerAlt />
            <span><strong>{train.source}</strong> → <strong>{train.destination}</strong></span>
          </div>
          <div className="info-row">
            <FaClock />
            <span>Departure: <strong>{train.departureTime}</strong></span>
          </div>
          <div className="info-row">
            <FaClock />
            <span>Arrival: <strong>{train.arrivalTime}</strong></span>
          </div>
        </div>

        <div className="info-card">
          <p className="info-card-title">Seat Availability</p>

          <div className="info-row">
            <FaChair />
            <span>Total Seats: <strong>{train.totalSeats}</strong></span>
          </div>
          <div className="info-row">
            <FaChair />
            <span className={seatsLow ? "seats-low-text" : ""}>
              Available: <strong>{train.availableSeats}</strong>
              {seatsLow ? " · Filling fast" : ""}
            </span>
          </div>
        </div>

      </div>

      {/* Fare */}
      <div className="class-card">
        <div className="class-card-header">
          <p className="card-section-title">Fare</p>
        </div>
        <table className="class-table">
          <thead>
            <tr>
              <th>Train</th>
              <th>Seats Available</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="class-name">{train.trainName}</span></td>
              <td>
                <span className={`seats-badge ${seatsLow ? "low" : ""}`}>
                  {train.availableSeats} {seatsLow ? "· Low" : "seats"}
                </span>
              </td>
              <td><span className="fare-cell">₹ {Number(train.price).toLocaleString()}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Book CTA */}
      <div className="book-section">
        <Link to={`/book/${train.id}`} className="book-now-btn">
          Book Now <FaArrowRight style={{ fontSize: 14 }} />
        </Link>
      </div>

    </div>
  );
}

export default TrainDetails;