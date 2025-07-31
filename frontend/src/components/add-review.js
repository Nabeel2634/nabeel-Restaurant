import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const AddReview = props => {
  let initialReviewState = ""

  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = async () => {
    if (!review.trim()) {
      alert('Please write a review before submitting.');
      return;
    }

    setIsLoading(true);

    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id,
      rating: rating
    };

    try {
      if (editing) {
        data.review_id = props.location.state.currentReview._id
        await RestaurantDataService.updateReview(data);
      } else {
        await RestaurantDataService.createReview(data);
      }
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert('Failed to save review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {props.user ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            {submitted ? (
              <div className="card shadow-custom text-center">
                <div className="card-body">
                  <div className="text-success mb-3">
                    <i className="fas fa-check-circle fa-3x"></i>
                  </div>
                  <h4 className="text-success">Review Submitted Successfully! 🎉</h4>
                  <p className="text-muted">Thank you for sharing your experience!</p>
                  <div className="d-flex gap-2 justify-content-center">
                    <Link
                      to={`/restaurants/${props.match.params.id}`}
                      className="btn btn-primary"
                    >
                      👁️ View Restaurant
                    </Link>
                    <Link to="/restaurants" className="btn btn-outline-secondary">
                      🍴 Browse More Restaurants
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-custom">
                <div className="card-header">
                  <h3 className="mb-0">
                    {editing ? '✏️ Edit Your Review' : '✍️ Write a Review'}
                  </h3>
                  <p className="text-muted mb-0">Share your dining experience</p>
                </div>

                <div className="card-body">
                  <form onSubmit={(e) => { e.preventDefault(); saveReview(); }}>
                    {/* Rating Section */}
                    <div className="mb-4">
                      <label className="form-label">⭐ Rating</label>
                      <div className="d-flex gap-2 align-items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`btn btn-outline-warning ${rating >= star ? 'active' : ''}`}
                            onClick={() => setRating(star)}
                            style={{ fontSize: '1.5rem', padding: '0.25rem 0.5rem' }}
                          >
                            ⭐
                          </button>
                        ))}
                        <span className="ms-2 text-muted">
                          {rating === 1 && 'Poor'}
                          {rating === 2 && 'Fair'}
                          {rating === 3 && 'Good'}
                          {rating === 4 && 'Very Good'}
                          {rating === 5 && 'Excellent'}
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="mb-4">
                      <label htmlFor="reviewText" className="form-label">
                        💬 Your Review
                      </label>
                      <textarea
                        className="form-control"
                        id="reviewText"
                        rows="5"
                        placeholder="Tell others about your experience... What did you like? What could be improved?"
                        value={review}
                        onChange={handleInputChange}
                        name="text"
                        required
                      />
                      <div className="form-text">
                        {review.length}/500 characters
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 justify-content-end">
                      <Link
                        to={`/restaurants/${props.match.params.id}`}
                        className="btn btn-outline-secondary"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isLoading || !review.trim()}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            {editing ? 'Updating...' : 'Submitting...'}
                          </>
                        ) : (
                          editing ? '💾 Update Review' : '📝 Submit Review'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-custom text-center">
              <div className="card-body">
                <div className="text-warning mb-3">
                  <i className="fas fa-lock fa-3x"></i>
                </div>
                <h4>Login Required</h4>
                <p className="text-muted">You need to be logged in to write a review.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <Link to="/login" className="btn btn-primary">
                    🔑 Login
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary">
                    📝 Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReview;