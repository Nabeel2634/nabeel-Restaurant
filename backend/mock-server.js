import app from "./server.js"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.PORT || 5000

// Mock data for testing
const mockRestaurants = [
  {
    _id: "1",
    name: "Artisanal Burger Co.",
    cuisine: "American",
    address: {
      building: "123",
      street: "Main Street",
      zipcode: "10001"
    },
    reviews: [
      {
        _id: "r1",
        name: "John Doe",
        text: "Great burgers and friendly service!",
        date: new Date("2024-01-15")
      }
    ]
  },
  {
    _id: "2", 
    name: "Pasta Palace",
    cuisine: "Italian",
    address: {
      building: "456",
      street: "Oak Avenue", 
      zipcode: "10002"
    },
    reviews: [
      {
        _id: "r2",
        name: "Jane Smith",
        text: "Authentic Italian flavors, loved the carbonara!",
        date: new Date("2024-01-20")
      }
    ]
  },
  {
    _id: "3",
    name: "Sushi Zen",
    cuisine: "Japanese", 
    address: {
      building: "789",
      street: "Pine Street",
      zipcode: "10003"
    },
    reviews: []
  },
  {
    _id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    address: {
      building: "321",
      street: "Elm Street", 
      zipcode: "10004"
    },
    reviews: [
      {
        _id: "r3",
        name: "Mike Johnson",
        text: "Best tacos in town! Fresh ingredients and great prices.",
        date: new Date("2024-01-25")
      }
    ]
  }
];

const mockCuisines = ["American", "Italian", "Japanese", "Mexican", "Chinese", "Indian"];

// Mock DAO functions
const MockRestaurantsDAO = {
  async injectDB() {
    console.log("Using mock restaurant data");
  },
  
  async getRestaurants({ filters = {}, page = 0, restaurantsPerPage = 20 }) {
    let filteredRestaurants = [...mockRestaurants];
    
    if (filters.name) {
      filteredRestaurants = filteredRestaurants.filter(r => 
        r.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.cuisine) {
      filteredRestaurants = filteredRestaurants.filter(r => 
        r.cuisine === filters.cuisine
      );
    }
    
    if (filters.zipcode) {
      filteredRestaurants = filteredRestaurants.filter(r => 
        r.address.zipcode === filters.zipcode
      );
    }
    
    const start = page * restaurantsPerPage;
    const end = start + restaurantsPerPage;
    
    return {
      restaurantsList: filteredRestaurants.slice(start, end),
      totalNumRestaurants: filteredRestaurants.length
    };
  },
  
  async getRestaurantByID(id) {
    return mockRestaurants.find(r => r._id === id);
  },
  
  async getCuisines() {
    return mockCuisines;
  }
};

const MockReviewsDAO = {
  async injectDB() {
    console.log("Using mock review data");
  },
  
  async addReview(restaurantId, userInfo, review, date) {
    const restaurant = mockRestaurants.find(r => r._id === restaurantId);
    if (restaurant) {
      const newReview = {
        _id: `r${Date.now()}`,
        name: userInfo.name,
        text: review,
        date: date,
        user_id: userInfo._id
      };
      restaurant.reviews.push(newReview);
    }
    return { success: true };
  },
  
  async updateReview(reviewId, userId, text, date) {
    for (let restaurant of mockRestaurants) {
      const review = restaurant.reviews.find(r => r._id === reviewId && r.user_id === userId);
      if (review) {
        review.text = text;
        review.date = date;
        return { modifiedCount: 1 };
      }
    }
    return { modifiedCount: 0 };
  },
  
  async deleteReview(reviewId, userId) {
    for (let restaurant of mockRestaurants) {
      const reviewIndex = restaurant.reviews.findIndex(r => r._id === reviewId && r.user_id === userId);
      if (reviewIndex !== -1) {
        restaurant.reviews.splice(reviewIndex, 1);
        return { deletedCount: 1 };
      }
    }
    return { deletedCount: 0 };
  }
};

// Initialize mock DAOs
await MockRestaurantsDAO.injectDB();
await MockReviewsDAO.injectDB();

// Start server
app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Restaurants API: http://localhost:${port}/api/v1/restaurants`);
  console.log("Using mock data - no database connection required");
});
