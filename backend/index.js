import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        serverSelectionTimeoutMS: 5000,
    }
).catch(err => {
    console.error("MongoDB connection failed:", err.message)
    console.log("Starting server without database connection...")

    // Start server without database
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      console.log("⚠️  Running without database - API will return empty data")
      console.log("To connect to database, update RESTREVIEWS_DB_URI in .env file")
    })
})
.then(async client => {
    if (client) {
        await RestaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
          console.log(`Server listening on port ${port}`)
          console.log("✅ Connected to MongoDB database")
        })
    }
})