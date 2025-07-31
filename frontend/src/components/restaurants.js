import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      {restaurant ? (
        <div className="fade-in">
          {/* Restaurant Header */}
          <div className="restaurant-card mb-4">
            <div className="restaurant-header">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h2 className="restaurant-title mb-2">{restaurant.name}</h2>
                  <span className="restaurant-cuisine">{restaurant.cuisine}</span>
                </div>
                <div className="text-end">
                  <div className="text-warning mb-2">
                    {'⭐'.repeat(Math.round(restaurant.avgRating || 4))}
                  </div>
                  <small className="text-light">
                    {restaurant.reviews?.length || 0} reviews
                  </small>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h6 className="text-primary-custom mb-3">📍 Location</h6>
                  <p className="mb-3">
                    {restaurant.address?.building} {restaurant.address?.street}, {restaurant.address?.zipcode}
                  </p>

                  <div className="d-flex gap-2 flex-wrap">
                    <Link
                      to={`/restaurants/${props.match.params.id}/review`}
                      className="btn btn-success"
                    >
                      ✍️ Write a Review
                    </Link>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/place/${encodeURIComponent(
                        `${restaurant.address?.building} ${restaurant.address?.street}, ${restaurant.address?.zipcode}`
                      )}`}
                      className="btn btn-outline-info"
                    >
                      🗺️ View on Map
                    </a>
                    <Link to="/restaurants" className="btn btn-outline-secondary">
                      ← Back to Restaurants
                    </Link>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h6 className="card-title">Quick Stats</h6>
                      <div className="row text-center">
                        <div className="col-6">
                          <div className="h4 text-primary-custom">{restaurant.reviews?.length || 0}</div>
                          <small>Reviews</small>
                        </div>
                        <div className="col-6">
                          <div className="h4 text-warning">
                            {restaurant.avgRating || '4.0'}
                          </div>
                          <small>Rating</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="card shadow-custom">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">💬 Customer Reviews</h4>
                <span className="badge bg-primary">{restaurant.reviews?.length || 0} reviews</span>
              </div>
            </div>

            <div className="card-body">
              {restaurant.reviews && restaurant.reviews.length > 0 ? (
                <div className="row">
                  {restaurant.reviews.map((review, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="review-card">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="review-author mb-1">{review.name}</h6>
                            <small className="review-date">
                              {new Date(review.date).toLocaleDateString()}
                            </small>
                          </div>
                          <div className="text-warning">
                            {'⭐'.repeat(review.rating || 5)}
                          </div>
                        </div>

                        <p className="mb-3">{review.text}</p>

                        {props.user && props.user.id === review.user_id && (
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => deleteReview(review._id, index)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              🗑️ Delete
                            </button>
                            <Link
                              to={{
                                pathname: `/restaurants/${props.match.params.id}/review`,
                                state: { currentReview: review }
                              }}
                              className="btn btn-sm btn-outline-primary"
                            >
                              ✏️ Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">💬</div>
                  <h5>No reviews yet</h5>
                  <p>Be the first to share your experience!</p>
                  <Link
                    to={`/restaurants/${props.match.params.id}/review`}
                    className="btn btn-primary"
                  >
                    ✍️ Write the First Review
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h4>Restaurant not found</h4>
          <p>The restaurant you're looking for doesn't exist or has been removed.</p>
          <Link to="/restaurants" className="btn btn-primary">
            ← Back to Restaurants
          </Link>
        </div>
      )}
    </div>
  );
};

export default Restaurant;