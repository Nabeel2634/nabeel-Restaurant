import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    setIsLoading(true);
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants || []);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-primary-custom mb-3">🍽️ Discover Amazing Restaurants</h1>
          <p className="lead text-muted">Find the perfect dining experience near you</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-container fade-in">
        <h3 className="search-title">🔍 Search Restaurants</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Restaurant Name</label>
            <div className="input-group">
              <span className="input-group-text">🏪</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={findByName}
              >
                Search
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Zip Code</label>
            <div className="input-group">
              <span className="input-group-text">📍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by zip code"
                value={searchZip}
                onChange={onChangeSearchZip}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={findByZip}
              >
                Search
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Cuisine Type</label>
            <div className="input-group">
              <span className="input-group-text">🍜</span>
              <select
                className="form-select"
                value={searchCuisine}
                onChange={onChangeSearchCuisine}
              >
                {cuisines.map((cuisine, index) => (
                  <option key={index} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                type="button"
                onClick={findByCuisine}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={retrieveRestaurants}
          >
            🔄 Show All Restaurants
          </button>
        </div>
      </div>
      {/* Results Section */}
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary-custom">
            🍴 Restaurants {restaurants.length > 0 && `(${restaurants.length} found)`}
          </h3>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : restaurants.length > 0 ? (
          <div className="row">
            {restaurants.map((restaurant, index) => {
              const address = restaurant.address
                ? `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
                : 'Address not available';

              return (
                <div key={restaurant._id || index} className="col-lg-4 col-md-6 mb-4">
                  <div className="restaurant-card fade-in">
                    <div className="restaurant-header">
                      <h5 className="restaurant-title">{restaurant.name}</h5>
                      <span className="restaurant-cuisine">{restaurant.cuisine}</span>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <i className="fas fa-map-marker-alt text-primary-custom me-2"></i>
                        {address}
                      </p>
                      <p className="card-text">
                        <i className="fas fa-star text-warning me-2"></i>
                        {restaurant.reviews?.length || 0} reviews
                      </p>
                      <div className="d-grid gap-2">
                        <Link
                          to={`/restaurants/${restaurant._id}`}
                          className="btn btn-primary"
                        >
                          👁️ View Details & Reviews
                        </Link>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`}
                          className="btn btn-outline-info"
                        >
                          🗺️ View on Map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🍽️</div>
            <h4>No restaurants found</h4>
            <p>Try adjusting your search criteria or check back later for new restaurants.</p>
            <button
              className="btn btn-primary"
              onClick={retrieveRestaurants}
            >
              🔄 Refresh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsList;