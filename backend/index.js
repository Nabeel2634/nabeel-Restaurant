import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

// Direct MongoDB connection string (hardcoded for deployment)
const MONGODB_URI = "mongodb+srv://restaurantUser:RestaurantApp2024!@cluster0.ujlpeq3.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0"

console.log("🔗 Connecting to MongoDB Atlas...")
console.log("Database: sample_restaurants")

MongoClient.connect(
    MONGODB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        serverSelectionTimeoutMS: 5000,
    }
).catch(err => {
    console.error("❌ MongoDB connection failed:", err.message)
    console.error("Connection string used:", MONGODB_URI.replace(/:[^:@]*@/, ':****@'))
    console.log("Starting server without database connection...")

    // Start server without database
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`)
      console.log("⚠️  Running without database - API will return empty data")
      console.log("🔧 Check MongoDB Atlas connection and credentials")
    })
})
.then(async client => {
    if (client) {
        console.log("✅ Connected to MongoDB Atlas successfully!")
        console.log("🗄️  Database: sample_restaurants")

        await RestaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)

        console.log("📊 Database Access Objects initialized")

        app.listen(port, () => {
          console.log(`🚀 Server listening on port ${port}`)
          console.log("🌐 Backend API ready!")
          console.log("📍 Health check: /health")
          console.log("🍽️  Restaurants API: /api/v1/restaurants")
        })
    }
})