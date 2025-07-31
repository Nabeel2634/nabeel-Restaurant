import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, create different user types based on email
      let user;
      if (formData.email === "admin@restaurant.com") {
        user = {
          id: "admin-1",
          name: "Admin User",
          email: formData.email,
          role: 'admin'
        };
      } else {
        user = {
          id: Date.now().toString(),
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'user'
        };
      }

      // Call the login function passed from App.js
      props.login(user);

      // Redirect to restaurants page
      props.history.push("/restaurants");

    } catch (error) {
      setErrors({ submit: "Login failed. Please check your credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = (userType) => {
    const demoUsers = {
      user: {
        id: "demo-user",
        name: "Demo User",
        email: "user@demo.com",
        role: 'user'
      },
      admin: {
        id: "demo-admin",
        name: "Demo Admin",
        email: "admin@demo.com",
        role: 'admin'
      }
    };

    props.login(demoUsers[userType]);
    props.history.push("/restaurants");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-custom">
            <div className="card-header text-center">
              <h3 className="mb-0">🔑 Welcome Back</h3>
              <p className="text-muted mb-0">Sign in to your account</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {errors.submit && (
                  <div className="alert alert-danger" role="alert">
                    {errors.submit}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                <p className="mb-2">
                  Don't have an account?
                  <Link to="/register" className="text-primary-custom ms-1">
                    Create one here
                  </Link>
                </p>

                <hr />

                <p className="text-muted mb-2">Quick Demo Access:</p>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => loginAsDemo('user')}
                  >
                    👤 Login as Demo User
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => loginAsDemo('admin')}
                  >
                    ⚙️ Login as Demo Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;