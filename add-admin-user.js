// Script to add admin user to MongoDB
// Run this in MongoDB Compass or Atlas Data Explorer

// Switch to sample_restaurants database
use('sample_restaurants');

// Create users collection if it doesn't exist and add admin user
db.users.insertOne({
  _id: "admin-001",
  name: "Nabeel Admin",
  email: "admin@nabeelrestaurant.com",
  password: "AdminPass123!", // In production, this should be hashed
  role: "admin",
  createdAt: new Date(),
  isActive: true,
  permissions: [
    "manage_restaurants",
    "manage_users", 
    "manage_reviews",
    "view_analytics",
    "system_admin"
  ]
});

// Add a regular demo user as well
db.users.insertOne({
  _id: "user-001", 
  name: "Demo User",
  email: "user@demo.com",
  password: "UserPass123!", // In production, this should be hashed
  role: "user",
  createdAt: new Date(),
  isActive: true,
  permissions: [
    "create_reviews",
    "edit_own_reviews",
    "view_restaurants"
  ]
});

// Verify users were created
db.users.find({});
