// Mock data for when database is not available
export const mockRestaurants = [
  {
    _id: "mock-1",
    name: "Artisanal Burger Co.",
    cuisine: "American",
    address: {
      building: "123",
      street: "Main Street",
      zipcode: "10001"
    },
    reviews: [
      {
        _id: "review-1",
        name: "John Doe",
        text: "Amazing burgers! The beef is perfectly cooked and the buns are fresh.",
        rating: 5,
        date: "2024-01-15T00:00:00.000Z",
        user_id: "user1"
      }
    ]
  },
  {
    _id: "mock-2", 
    name: "Pasta Palace",
    cuisine: "Italian",
    address: {
      building: "456",
      street: "Oak Avenue", 
      zipcode: "10002"
    },
    reviews: [
      {
        _id: "review-2",
        name: "Sarah Wilson",
        text: "Authentic Italian flavors! The carbonara was creamy and perfect.",
        rating: 5,
        date: "2024-01-20T00:00:00.000Z",
        user_id: "user2"
      }
    ]
  },
  {
    _id: "mock-3",
    name: "Sushi Zen", 
    cuisine: "Japanese",
    address: {
      building: "789",
      street: "Pine Street",
      zipcode: "10003"
    },
    reviews: [
      {
        _id: "review-3",
        name: "Mike Johnson",
        text: "Fresh sushi and beautiful presentation. The chef's special roll was incredible!",
        rating: 5,
        date: "2024-01-25T00:00:00.000Z",
        user_id: "user3"
      }
    ]
  },
  {
    _id: "mock-4",
    name: "Taco Fiesta",
    cuisine: "Mexican", 
    address: {
      building: "321",
      street: "Elm Street",
      zipcode: "10004"
    },
    reviews: [
      {
        _id: "review-4",
        name: "Maria Rodriguez",
        text: "Authentic Mexican flavors and generous portions. The guacamole is made fresh daily!",
        rating: 4,
        date: "2024-01-30T00:00:00.000Z",
        user_id: "user4"
      }
    ]
  },
  {
    _id: "mock-5",
    name: "Dragon Palace",
    cuisine: "Chinese",
    address: {
      building: "654", 
      street: "Maple Drive",
      zipcode: "10005"
    },
    reviews: [
      {
        _id: "review-5",
        name: "Lisa Wang",
        text: "Great dim sum and friendly service. The Peking duck was outstanding!",
        rating: 4,
        date: "2024-02-01T00:00:00.000Z",
        user_id: "user5"
      }
    ]
  },
  {
    _id: "mock-6",
    name: "Spice Garden",
    cuisine: "Indian",
    address: {
      building: "987",
      street: "Curry Lane", 
      zipcode: "10006"
    },
    reviews: [
      {
        _id: "review-6",
        name: "Raj Patel",
        text: "Authentic Indian cuisine with perfect spice levels. The butter chicken is a must-try!",
        rating: 5,
        date: "2024-02-03T00:00:00.000Z",
        user_id: "user6"
      }
    ]
  }
];

export const mockCuisines = [
  "American",
  "Italian", 
  "Japanese",
  "Mexican",
  "Chinese",
  "Indian",
  "Thai",
  "French",
  "Mediterranean"
];
