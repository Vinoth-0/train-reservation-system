import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TrainService from "../services/TrainService";
import "./EditTrain.css";

function EditTrain() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [train, setTrain] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    availableSeats: "",
    price: "",
  });

  useEffect(() => {
    fetchTrain();
  }, []);

  const fetchTrain = async () => {
    try {
      const response = await TrainService.getTrainById(id);
      setTrain(response.data);
    } catch (error) {
      toast.error("Unable to load train.");
      navigate("/admin");
    }
  };

  const handleChange = (e) => {
    setTrain({
      ...train,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const {
      trainNumber,
      trainName,
      source,
      destination,
      departureTime,
      arrivalTime,
      totalSeats,
      price,
    } = train;

    if (
      !trainNumber ||
      !trainName ||
      !source ||
      !destination ||
      !departureTime ||
      !arrivalTime ||
      !totalSeats ||
      !price
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const trainData = {
        ...train,
        totalSeats: Number(train.totalSeats),
        availableSeats: Number(train.availableSeats),
        price: Number(train.price),
      };

      await TrainService.updateTrain(id, trainData);

      toast.success("Train Updated Successfully!");

      navigate("/admin");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update train."
      );
    }
  };

  return (
    <div className="edit-train-page">
      <div className="edit-train-card">
        <h1>Edit Train</h1>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="trainNumber"
            value={train.trainNumber}
            onChange={handleChange}
            placeholder="Train Number"
          />

          <input
            type="text"
            name="trainName"
            value={train.trainName}
            onChange={handleChange}
            placeholder="Train Name"
          />

          <input
            type="text"
            name="source"
            value={train.source}
            onChange={handleChange}
            placeholder="Source"
          />

          <input
            type="text"
            name="destination"
            value={train.destination}
            onChange={handleChange}
            placeholder="Destination"
          />

          <input
            type="time"
            name="departureTime"
            value={train.departureTime}
            onChange={handleChange}
          />

          <input
            type="time"
            name="arrivalTime"
            value={train.arrivalTime}
            onChange={handleChange}
          />

          <input
            type="number"
            name="totalSeats"
            value={train.totalSeats}
            onChange={handleChange}
            placeholder="Total Seats"
          />

          <input
            type="number"
            name="price"
            value={train.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <div className="button-group">
            <button type="submit" className="update-btn">
              Update Train
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTrain;