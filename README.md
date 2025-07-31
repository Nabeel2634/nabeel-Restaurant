# 🍽️ Nabeel Restaurant Reviews

A modern, full-stack restaurant review application built with the MERN stack. This application features a beautiful, responsive UI with comprehensive admin panel functionality.

![Restaurant Reviews App](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎨 **Modern UI/UX Design**
- Beautiful gradient color scheme with smooth animations
- Fully responsive design for all devices
- Modern card-based layout with hover effects
- Glass morphism effects and professional styling
- Emoji-based icons for universal appeal

### 👤 **User Authentication**
- Secure login/register system with validation
- Role-based access control (User/Admin)
- Demo login options for quick testing
- Protected routes and user sessions

### 🍴 **Restaurant Features**
- Browse restaurants with advanced search and filtering
- View detailed restaurant information with ratings
- Interactive Google Maps integration
- Cuisine-based categorization

### ⭐ **Review System**
- 5-star rating system with visual feedback
- Rich text review composition
- Edit and delete own reviews
- Review moderation capabilities

### ⚙️ **Admin Panel**
- Comprehensive dashboard with statistics
- Restaurant management (CRUD operations)
- User management with role controls
- Review moderation and content management
- Real-time activity monitoring

## 🛠️ Technology Stack

- **Frontend**: React 17, React Router v5, Bootstrap 5, Custom CSS
- **Backend**: Node.js, Express.js, MongoDB Driver v6
- **Database**: MongoDB Atlas (Cloud) / Local MongoDB
- **Styling**: Custom CSS with CSS Variables, Responsive Design
- **Authentication**: JWT-based (ready for implementation)
- **Deployment**: Vercel, Render, Netlify ready

## Prerequisites

The following are required:

* MongoDB Atlas account with the sample dataset loaded onto a cluster (includes database sample_restaurants)
* Node.JS (tested with v12.18.0)

The backend and frontend are setup with npm and npx

### Backend

Create with ```npm```

```
$ mkdir backend
$ cd backend
$ npm init -y
```

The following modules can then be installed

```
$ npm install express cors mongodb dotenv
$ npm install -g nodemon
```

Configure the ```.env``` file with the MongoDB Atlas connection URL. This should point to the example ```sample_restaurants``` database that is available to install when a cluster is setup. 

The URL can be obtained within the MongoDB Atlas UI. Select the cluster > Connect > Connect your application.

```
RESTREVIEWS_DB_URI=mongodb+srv://[username]:[password]@[cluster]/sample_restaurants?retryWrites=true&w=majority
RESTREVIEWS_NS=sample_restaurants
PORT=5000
```

### Frontend

Create with ```npx``` and install the necessary frameworks.

```
$ npx create-react-app frontend
$ npm install bootstrap
$ npm install react-router-dom
$ npm install axios
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (optional - app works without database)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Nabeel2634/nabeel-Restaurant.git
cd nabeel-Restaurant
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install --legacy-peer-deps
```

3. **Setup Environment Variables**

**Backend** (`backend/.env`):
```bash
# MongoDB Connection (optional for demo)
RESTREVIEWS_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/sample_restaurants?retryWrites=true&w=majority
RESTREVIEWS_NS=sample_restaurants

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend** (`frontend/.env`):
```bash
# API Base URL
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

4. **Start the Application**
```bash
# Start backend (from backend directory)
cd backend && npm start

# Start frontend (from frontend directory)
cd frontend && npm start
```

5. **Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🎮 Demo Access

The application includes demo login functionality for quick testing:

### Demo Users
- **Regular User**: Click "Login as Demo User" on login page
- **Admin User**: Click "Login as Demo Admin" on login page

### Demo Features
- Browse restaurants with modern UI
- Write and manage reviews with 5-star ratings
- Access admin panel (admin user only)
- Experience responsive design on mobile

## 📱 Screenshots

### Main Features
- **🏠 Homepage**: Modern hero section with search functionality
- **🍴 Restaurant List**: Card-based layout with filtering
- **👁️ Restaurant Details**: Detailed view with reviews and ratings
- **✍️ Review System**: Rich review composition with star ratings
- **⚙️ Admin Panel**: Comprehensive management dashboard

## 🚀 Deployment

### Option 1: Render (Recommended for Full-Stack)

1. **Fork this repository**
2. **Create Render account** at https://render.com
3. **Deploy Backend**:
   - Create new "Web Service"
   - Build: `cd backend && npm install`
   - Start: `cd backend && npm start`
   - Environment variables:
     ```
     NODE_ENV=production
     RESTREVIEWS_DB_URI=your_mongodb_connection
     ALLOWED_ORIGINS=https://your-frontend.onrender.com
     ```

4. **Deploy Frontend**:
   - Create new "Static Site"
   - Build: `cd frontend && npm install --legacy-peer-deps && npm run build`
   - Publish: `frontend/build`
   - Environment: `REACT_APP_API_URL=https://your-backend.onrender.com`

### Option 2: Vercel + Railway

1. **Frontend on Vercel**:
   ```bash
   npm install -g vercel
   cd frontend && vercel
   ```

2. **Backend on Railway**:
   - Connect GitHub repository
   - Deploy backend service
   - Add environment variables

### Option 3: Netlify + Heroku

1. **Frontend on Netlify**: Connect repository, set build settings
2. **Backend on Heroku**: Deploy Node.js app with MongoDB addon

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. Create free cluster at https://mongodb.com/atlas
2. Load sample data (includes restaurant data)
3. Create database user and get connection string
4. Update `RESTREVIEWS_DB_URI` in environment variables

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017`

## 🔧 Configuration Files

The project includes ready-to-use configuration files:
- `vercel.json` - Vercel deployment
- `render.yaml` - Render deployment
- `netlify.toml` - Netlify deployment
- `package.json` - Root package with scripts
- `.env.example` - Environment templates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nabeel** - [GitHub Profile](https://github.com/Nabeel2634)

## 🙏 Acknowledgments

- Built with the MERN stack
- UI inspired by modern design principles
- Icons and emojis for enhanced user experience
- Bootstrap for responsive grid system
- MongoDB Atlas for cloud database hosting

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/Nabeel2634/nabeel-Restaurant/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about your environment and the issue

---

⭐ **Star this repository if you found it helpful!** ⭐

Made with ❤️ by Nabeel