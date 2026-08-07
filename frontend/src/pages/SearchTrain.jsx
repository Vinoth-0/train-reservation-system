import { useEffect, useState } from "react";
import { FaTrain, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import TrainCard from "../components/TrainCard";
import TrainService from "../services/TrainService";
import "./SearchTrain.css";

function SearchTrain() {
  const [search, setSearch] = useState({
    source: "",
    destination: "",
  });

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchAllTrains();
  }, []);

  const fetchAllTrains = async () => {
    setLoading(true);
    try {
      const response = await TrainService.getAllTrains();
      setTrains(response.data);
    } catch (error) {
      toast.error("Unable to load trains.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const response = await TrainService.searchTrains(search);
      setTrains(response.data);
    } catch (error) {
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch({ source: "", destination: "" });
    setSearched(false);
    fetchAllTrains();
  };

  return (
    <div className="search-page">

      <div className="search-page-header">
        <span className="section-label">ATrain</span>
        <h1>Find Your Train</h1>
      </div>

      {/* Search form card */}
      <div className="search-form-card">
        <div className="search-form-header">
          <div className="search-form-header-icon"><FaTrain /></div>
          <span>Search by source and destination</span>
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
                placeholder="e.g. New Delhi"
                value={search.destination}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="search-submit-btn">
              Search →
            </button>

            {searched && (
              <button
                type="button"
                className="search-reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            )}

          </form>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="results-meta">
          <span className="results-count">Loading trains…</span>
        </div>
      ) : trains.length > 0 ? (
        <>
          <div className="results-meta">
            <span className="results-count">
              <strong>{trains.length} trains</strong> found
            </span>
          </div>

          <div className="train-list">
            {trains.map((train) => (
              <TrainCard key={train.id} train={train} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-trains">
          <div className="no-trains-icon"><FaSearch /></div>
          <h3>No trains found</h3>
          <p>Try adjusting your source or destination.</p>
        </div>
      )}

    </div>
  );
}

export default SearchTrain;