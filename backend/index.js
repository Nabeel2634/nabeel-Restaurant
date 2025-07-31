import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

// Multiple connection strategies for MongoDB Atlas
const MONGODB_CONNECTIONS = [
    // Strategy 1: Standard SRV with minimal options
    "mongodb+srv://restaurantUser:RestaurantApp2024!@cluster0.ujlpeq3.mongodb.net/sample_restaurants?retryWrites=true&w=majority",

    // Strategy 2: SRV with TLS disabled
    "mongodb+srv://restaurantUser:RestaurantApp2024!@cluster0.ujlpeq3.mongodb.net/sample_restaurants?retryWrites=true&w=majority&tls=false",

    // Strategy 3: Direct connection to MongoDB nodes (bypass SRV)
    "mongodb://cluster0-shard-00-00.ujlpeq3.mongodb.net:27017,cluster0-shard-00-01.ujlpeq3.mongodb.net:27017,cluster0-shard-00-02.ujlpeq3.mongodb.net:27017/sample_restaurants?ssl=false&replicaSet=atlas-123abc-shard-0&authSource=admin&retryWrites=true&w=majority",

    // Strategy 4: Simple connection without SSL
    "mongodb+srv://restaurantUser:RestaurantApp2024!@cluster0.ujlpeq3.mongodb.net/sample_restaurants?ssl=false"
]

console.log("🔗 Connecting to MongoDB Atlas...")
console.log("Database: sample_restaurants")
console.log("🔄 Trying multiple connection strategies...")

// Function to try multiple connection strategies
async function connectToMongoDB() {
    for (let i = 0; i < MONGODB_CONNECTIONS.length; i++) {
        const connectionString = MONGODB_CONNECTIONS[i];
        console.log(`📡 Attempting connection strategy ${i + 1}/${MONGODB_CONNECTIONS.length}...`);

        try {
            const client = await MongoClient.connect(connectionString, {
                maxPoolSize: 50,
                wtimeoutMS: 2500,
                serverSelectionTimeoutMS: 8000,
            });

            console.log(`✅ Connection successful with strategy ${i + 1}!`);
            return client;
        } catch (error) {
            console.log(`❌ Strategy ${i + 1} failed:`, error.message);
            if (i === MONGODB_CONNECTIONS.length - 1) {
                throw new Error("All connection strategies failed");
            }
        }
    }
}

// Try to connect using multiple strategies
connectToMongoDB().catch(err => {
    console.error("❌ All MongoDB connection strategies failed:", err.message)
    console.log("🚀 Starting server without database connection...")

    // Start server without database
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`)
      console.log("⚠️  Running without database - API will return empty data")
      console.log("🔧 Check MongoDB Atlas connection and credentials")
      console.log("💡 Consider using MongoDB Compass to test connection")
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