import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

// Configure CORS for production (hardcoded for deployment)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'https://nabeel-restaurant.vercel.app',
      'https://nabeel-restaurant-backend.onrender.com'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('🚫 CORS blocked origin:', origin);
      callback(null, true); // Allow all origins for now
    }
  },
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// API routes
app.use("/api/v1/restaurants", restaurants)

// 404 handler
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

export default app

