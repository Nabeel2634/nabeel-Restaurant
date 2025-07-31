import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Configure CORS for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000'];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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
    environment: process.env.NODE_ENV || "development",
    message: "Backend server is running without database connection"
  });
});

// Test API endpoint
app.get("/api/v1/restaurants", (req, res) => {
  res.json({
    message: "API is working! Database connection needed for real data.",
    restaurants: [],
    status: "test_mode"
  });
});

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

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`)
  console.log(`Health check: http://localhost:${port}/health`)
  console.log(`Test API: http://localhost:${port}/api/v1/restaurants`)
});
