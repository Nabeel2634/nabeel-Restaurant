import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Register from "./components/register";
import AdminPanel from "./components/admin-panel";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/restaurants" className="navbar-brand">
            🍽️ Restaurant Reviews
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/restaurants" className="nav-link">
                  🏠 Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/restaurants" className="nav-link">
                  🍴 Restaurants
                </Link>
              </li>
              {user && user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">
                    ⚙️ Admin Panel
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    👤 {user.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      🔑 Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      📝 Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <Register {...props} login={login} />
            )}
          />
          <Route
            path="/admin"
            render={(props) => (
              user && user.role === 'admin' ? (
                <AdminPanel {...props} user={user} />
              ) : (
                <div className="container">
                  <div className="alert alert-danger">
                    Access denied. Admin privileges required.
                  </div>
                </div>
              )
            )}
          />
        </Switch>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p>&copy; 2024 Restaurant Reviews. Made with ❤️ for food lovers.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;