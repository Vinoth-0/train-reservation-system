import { useState } from "react";
import { FaTrain, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import TrainCard from "../components/TrainCard";
import TrainService from "../services/TrainService";
import "./SearchTrain.css";

function SearchTrain() {
  const [search, setSearch] = useState({
    source: "",
    destination: "",
    date: "",
    travelClass: "",
  });

  const [trains, setTrains] = useState([]);

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.source || !search.destination) {
      toast.error("Please enter source and destination.");
      return;
    }

    try {
      const response = await TrainService.searchTrains(
        search.source,
        search.destination
      );

      setTrains(response.data);

      if (response.data.length === 0) {
        toast.info("No trains found.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to search trains."
      );
    }
  };

  return (
    <div className="search-page">

      <div className="search-page-header">
        <span className="section-label">ATrain</span>
        <h1>Find Your Train</h1>
      </div>

      {/* Search Form */}
      <div className="search-form-card">
        <div className="search-form-header">
          <div className="search-form-header-icon">
            <FaTrain />
          </div>
          <span>Search across available routes</span>
        </div>

        <div className="search-form-body">
          <form className="search-form" onSubmit={handleSearch}>

            <div className="form-field">
              <label>From</label>
              <input
                type="text"
                name="source"
                placeholder="e.g. Chennai"
                value={search.source}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>To</label>
              <input
                type="text"
                name="destination"
                placeholder="e.g. Bengaluru"
                value={search.destination}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={search.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Class</label>
              <select
                name="travelClass"
                value={search.travelClass}
                onChange={handleChange}
              >
                <option value="">All Classes</option>
                <option value="SL">Sleeper (SL)</option>
                <option value="3A">AC 3-Tier (3A)</option>
                <option value="2A">AC 2-Tier (2A)</option>
                <option value="1A">AC First (1A)</option>
              </select>
            </div>

            <button type="submit" className="search-submit-btn">
              Search →
            </button>

          </form>
        </div>
      </div>

      {/* Results */}
      {trains.length > 0 ? (
        <>
          <div className="results-meta">
            <span className="results-count">
              <strong>{trains.length} trains</strong> found
            </span>
          </div>

          <div className="train-list">
            {trains.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="no-trains">
          <div className="no-trains-icon">
            <FaSearch />
          </div>
          <h3>No trains found</h3>
          <p>Search for a route to see available trains.</p>
        </div>
      )}
    </div>
  );
}

export default SearchTrain;