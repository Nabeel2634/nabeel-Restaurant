# 🚀 Deployment Guide: Vercel + Render

## Overview
- **Frontend**: Deployed on Vercel (React app)
- **Backend**: Deployed on Render (Node.js API)
- **Database**: MongoDB Atlas (Cloud)

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Load sample data (includes `sample_restaurants` database)
4. Create database user with read/write permissions
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/sample_restaurants?retryWrites=true&w=majority`

### 2. GitHub Repository
Ensure your code is pushed to: `https://github.com/Nabeel2634/nabeel-Restaurant`

## 🎯 Step 1: Deploy Backend to Render

### A. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### B. Deploy Backend Service
1. Click **"New +"** → **"Web Service"**
2. Select your repository: `nabeel-Restaurant`
3. Configure service:
   - **Name**: `nabeel-restaurant-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)` or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### C. Set Environment Variables in Render
Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
RESTREVIEWS_DB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/sample_restaurants?retryWrites=true&w=majority
RESTREVIEWS_NS=sample_restaurants
ALLOWED_ORIGINS=https://nabeel-restaurant.vercel.app
```

### D. Deploy and Get Backend URL
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Your backend URL will be: `https://nabeel-restaurant-backend.onrender.com`
4. Test health check: `https://nabeel-restaurant-backend.onrender.com/health`

## 🎨 Step 2: Deploy Frontend to Vercel

### A. Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### B. Deploy Frontend
1. Click **"New Project"**
2. Import your repository: `nabeel-Restaurant`
3. Configure project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install --legacy-peer-deps`

### C. Set Environment Variables in Vercel
Add this environment variable in Vercel dashboard:

```
REACT_APP_API_URL=https://nabeel-restaurant-backend.onrender.com
```

### D. Deploy and Get Frontend URL
1. Click **"Deploy"**
2. Wait for deployment (3-5 minutes)
3. Your frontend URL will be: `https://nabeel-restaurant.vercel.app`

## 🔄 Step 3: Update CORS Configuration

After getting your Vercel URL, update the backend CORS:

1. Go to Render dashboard → Your backend service
2. Update environment variable:
   ```
   ALLOWED_ORIGINS=https://nabeel-restaurant.vercel.app
   ```
3. Redeploy the backend service

## ✅ Step 4: Test Deployment

### Backend Testing
1. Health check: `https://nabeel-restaurant-backend.onrender.com/health`
2. API test: `https://nabeel-restaurant-backend.onrender.com/api/v1/restaurants`

### Frontend Testing
1. Visit: `https://nabeel-restaurant.vercel.app`
2. Test login with demo users
3. Try creating reviews
4. Access admin panel (with admin demo login)

### Integration Testing
1. Ensure frontend can communicate with backend
2. Test all CRUD operations
3. Verify admin panel functionality

## 🔧 Troubleshooting

### Common Issues

**Backend not starting:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render logs for errors

**Frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is deployed and running

**Database connection errors:**
- Verify MongoDB Atlas connection string
- Check database user permissions
- Ensure IP whitelist includes 0.0.0.0/0 for Render

### Render Logs
Access logs in Render dashboard → Your service → Logs tab

### Vercel Logs
Access logs in Vercel dashboard → Your project → Functions tab

## 🎉 Success!

Once deployed, you'll have:
- **Frontend**: `https://nabeel-restaurant.vercel.app`
- **Backend**: `https://nabeel-restaurant-backend.onrender.com`
- **Admin Panel**: `https://nabeel-restaurant.vercel.app/admin`

## 📱 Demo Access
- **Regular User**: Click "Login as Demo User"
- **Admin User**: Click "Login as Demo Admin"

Your restaurant reviews application is now live and accessible worldwide! 🌍
