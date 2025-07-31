import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";

const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalUsers: 0,
    totalReviews: 0,
    avgRating: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading data
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "user", joinDate: "2024-01-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", joinDate: "2024-01-20" },
      { id: 3, name: "Admin User", email: "admin@restaurant.com", role: "admin", joinDate: "2024-01-01" }
    ]);

    setReviews([
      { id: 1, restaurantName: "Artisanal Burger Co.", userName: "John Doe", rating: 5, text: "Great food!", date: "2024-01-25" },
      { id: 2, restaurantName: "Pasta Palace", userName: "Jane Smith", rating: 4, text: "Good service", date: "2024-01-24" }
    ]);

    setStats({
      totalRestaurants: 4,
      totalUsers: 3,
      totalReviews: 2,
      avgRating: 4.5
    });

    // Load restaurants from API
    loadRestaurants();
  }, []);

  const loadRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        setRestaurants(response.data.restaurants || []);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderDashboard = () => (
    <div className="row">
      <div className="col-12">
        <h2 className="mb-4">📊 Dashboard Overview</h2>
      </div>
      
      <div className="col-md-3 mb-4">
        <div className="card admin-card text-center">
          <div className="card-body">
            <h3 className="text-warning">🍴</h3>
            <h4>{stats.totalRestaurants}</h4>
            <p>Total Restaurants</p>
          </div>
        </div>
      </div>
      
      <div className="col-md-3 mb-4">
        <div className="card admin-card text-center">
          <div className="card-body">
            <h3 className="text-info">👥</h3>
            <h4>{stats.totalUsers}</h4>
            <p>Total Users</p>
          </div>
        </div>
      </div>
      
      <div className="col-md-3 mb-4">
        <div className="card admin-card text-center">
          <div className="card-body">
            <h3 className="text-success">💬</h3>
            <h4>{stats.totalReviews}</h4>
            <p>Total Reviews</p>
          </div>
        </div>
      </div>
      
      <div className="col-md-3 mb-4">
        <div className="card admin-card text-center">
          <div className="card-body">
            <h3 className="text-warning">⭐</h3>
            <h4>{stats.avgRating}</h4>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card admin-card">
          <div className="card-header">
            <h5>📈 Recent Activity</h5>
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li className="mb-2">🆕 New user "John Doe" registered</li>
              <li className="mb-2">⭐ New review added for "Artisanal Burger Co."</li>
              <li className="mb-2">🍴 Restaurant "Pasta Palace" updated</li>
              <li className="mb-2">👤 User "Jane Smith" updated profile</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRestaurants = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🍴 Manage Restaurants</h2>
        <button className="btn btn-success">+ Add Restaurant</button>
      </div>
      
      <div className="card admin-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cuisine</th>
                  <th>Address</th>
                  <th>Reviews</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant, index) => (
                    <tr key={index}>
                      <td>{restaurant.name || 'N/A'}</td>
                      <td>{restaurant.cuisine || 'N/A'}</td>
                      <td>{restaurant.address?.street || 'N/A'}</td>
                      <td>{restaurant.reviews?.length || 0}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No restaurants found. Connect to database to see data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Manage Users</h2>
        <button className="btn btn-success">+ Add User</button>
      </div>
      
      <div className="card admin-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-warning' : 'bg-info'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>💬 Manage Reviews</h2>
        <button className="btn btn-warning">🔍 Filter Reviews</button>
      </div>
      
      <div className="card admin-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Restaurant</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td>{review.restaurantName}</td>
                    <td>{review.userName}</td>
                    <td>
                      <span className="text-warning">
                        {'⭐'.repeat(review.rating)}
                      </span>
                    </td>
                    <td>{review.text}</td>
                    <td>{review.date}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 admin-sidebar">
            <div className="text-center mb-4">
              <h4>⚙️ Admin Panel</h4>
              <p className="text-muted">Welcome, {user.name}</p>
            </div>
            
            <nav className="nav flex-column">
              <button 
                className={`nav-link btn text-start ${activeTab === 'dashboard' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                📊 Dashboard
              </button>
              <button 
                className={`nav-link btn text-start ${activeTab === 'restaurants' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('restaurants')}
              >
                🍴 Restaurants
              </button>
              <button 
                className={`nav-link btn text-start ${activeTab === 'users' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                👥 Users
              </button>
              <button 
                className={`nav-link btn text-start ${activeTab === 'reviews' ? 'active bg-primary' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                💬 Reviews
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="col-md-9 admin-content">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'restaurants' && renderRestaurants()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'reviews' && renderReviews()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
