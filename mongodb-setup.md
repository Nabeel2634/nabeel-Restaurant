# 🗄️ MongoDB Atlas Setup Guide

## Quick Setup for Restaurant Reviews App

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click **"Try Free"**
3. Sign up with email or Google account
4. Verify your email address

### Step 2: Create a Cluster
1. Choose **"Shared"** (Free tier)
2. Select **"AWS"** as cloud provider
3. Choose region closest to you
4. Cluster name: `RestaurantCluster` (or any name)
5. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Load Sample Data
1. In your cluster, click **"..."** → **"Load Sample Dataset"**
2. Click **"Load Sample Dataset"** (this includes `sample_restaurants`)
3. Wait for data to load (5-10 minutes)

### Step 4: Create Database User
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `restaurantUser` (or any name)
5. Password: Generate secure password or create your own
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 5: Configure Network Access
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 6: Get Connection String
1. Go to **"Clusters"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **"Node.js"**, Version: **"4.1 or later"**
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 7: Format for Restaurant App
Replace the connection string with your details:
```
mongodb+srv://restaurantUser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sample_restaurants?retryWrites=true&w=majority
```

**Important**: 
- Replace `YOUR_PASSWORD` with your actual password
- Add `/sample_restaurants` before the `?` to specify the database
- Keep `?retryWrites=true&w=majority` at the end

### Step 8: Test Connection
Use this connection string in your environment variables:
- **Render**: `RESTREVIEWS_DB_URI`
- **Local**: `backend/.env` file

### Sample Data Included
The `sample_restaurants` database includes:
- **restaurants** collection: Restaurant information
- **reviews** collection: Customer reviews
- Multiple cuisines: American, Italian, Chinese, etc.

### Security Best Practices
1. **Never commit passwords** to GitHub
2. **Use environment variables** for connection strings
3. **Rotate passwords** regularly
4. **Monitor database access** in Atlas dashboard

### Troubleshooting
- **Connection timeout**: Check network access settings
- **Authentication failed**: Verify username/password
- **Database not found**: Ensure sample data is loaded
- **IP not whitelisted**: Add 0.0.0.0/0 to network access

Your MongoDB Atlas database is now ready for the restaurant reviews application! 🎉
