import { useState } from "react";
import { toast } from "react-toastify";
import "./AddTrain.css";
import TrainService from "../services/TrainService";

function AddTrain() {
  const [train, setTrain] = useState({
    trainNumber: "",
    trainName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    price: "",
  });

  const handleChange = (e) => {
    setTrain({
      ...train,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
    toast.error("Please fill all the fields.");
    return;
  }

  try {

    const trainData = {
      ...train,
      totalSeats: Number(train.totalSeats),
      availableSeats: Number(train.totalSeats), // Initially all seats are available
      price: Number(train.price)
    };

    await TrainService.saveTrain(trainData);

    toast.success("Train Added Successfully!");

    setTrain({
      trainNumber: "",
      trainName: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      totalSeats: "",
      price: "",
    });

  } catch (error) {

    if (error.response) {
      toast.error(error.response.data.message || "Failed to add train");
    } else {
      toast.error("Unable to connect to the server");
    }

  }
};
  const handleReset = () => {
    setTrain({
      trainNumber: "",
      trainName: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      totalSeats: "",
      price: "",
    });
  };

  return (
    <div className="add-train-page">

      <div className="add-train-card">

        <h1>Add New Train</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="trainNumber"
            placeholder="Train Number"
            value={train.trainNumber}
            onChange={handleChange}
          />

          <input
            type="text"
            name="trainName"
            placeholder="Train Name"
            value={train.trainName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="source"
            placeholder="Source Station"
            value={train.source}
            onChange={handleChange}
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination Station"
            value={train.destination}
            onChange={handleChange}
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
            placeholder="Total Seats"
            value={train.totalSeats}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Ticket Price"
            value={train.price}
            onChange={handleChange}
          />

          <div className="button-group">

            <button
              type="submit"
              className="add-btn"
            >
              Add Train
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTrain;