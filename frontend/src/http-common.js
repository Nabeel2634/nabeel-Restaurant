import axios from "axios";

// Use environment variable for API base URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default axios.create({
  baseURL: `${API_BASE_URL}/api/v1/restaurants`,
  headers: {
    "Content-type": "application/json"
  }
});