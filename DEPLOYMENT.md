# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] MongoDB Atlas cluster created and configured
- [ ] Sample restaurants database loaded
- [ ] Database user created with appropriate permissions
- [ ] Connection string obtained

### ✅ Code Preparation
- [ ] All dependencies updated
- [ ] Environment variables configured
- [ ] CORS origins set for production domains
- [ ] Build scripts tested locally

## Render Deployment (Recommended)

### Backend Deployment
1. **Create Web Service**
   - [ ] Repository connected
   - [ ] Build command: `cd backend && npm install`
   - [ ] Start command: `cd backend && npm start`
   - [ ] Environment variables added:
     - [ ] `NODE_ENV=production`
     - [ ] `RESTREVIEWS_DB_URI=<your_mongodb_connection>`
     - [ ] `RESTREVIEWS_NS=sample_restaurants`
     - [ ] `ALLOWED_ORIGINS=<your_frontend_url>`

2. **Test Backend**
   - [ ] Health check endpoint working: `https://your-backend.onrender.com/health`
   - [ ] API endpoints responding correctly

### Frontend Deployment
1. **Create Static Site**
   - [ ] Build command: `cd frontend && npm install && npm run build`
   - [ ] Publish directory: `frontend/build`
   - [ ] Environment variables added:
     - [ ] `REACT_APP_API_URL=<your_backend_url>`

2. **Test Frontend**
   - [ ] Application loads correctly
   - [ ] API calls working
   - [ ] All routes functioning

## Vercel Deployment (Frontend Only)

### Frontend Deployment
1. **Deploy to Vercel**
   - [ ] `vercel.json` configuration reviewed
   - [ ] Environment variables set in Vercel dashboard
   - [ ] Build and deployment successful

2. **Backend Deployment** (separate service required)
   - [ ] Deploy backend to Railway, Heroku, or other Node.js hosting
   - [ ] Update frontend environment variables with backend URL

## Post-Deployment Testing

### Functionality Tests
- [ ] User registration/login working
- [ ] Restaurant listing displays correctly
- [ ] Search functionality working
- [ ] Review creation/editing/deletion working
- [ ] Navigation between pages working

### Performance Tests
- [ ] Page load times acceptable
- [ ] API response times reasonable
- [ ] No console errors in browser
- [ ] Mobile responsiveness verified

### Security Tests
- [ ] CORS properly configured
- [ ] Environment variables not exposed in frontend
- [ ] Database connection secure
- [ ] No sensitive data in logs

## Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Check `REACT_APP_API_URL` environment variable
- Verify CORS configuration in backend
- Ensure backend is deployed and accessible

**Database connection errors:**
- Verify MongoDB Atlas connection string
- Check database user permissions
- Ensure IP whitelist includes deployment platform IPs

**Build failures:**
- Check Node.js version compatibility
- Verify all dependencies are properly installed
- Review build logs for specific errors

**React Router issues:**
- Ensure static hosting is configured for SPA
- Check redirect rules for 404 handling
- Verify all route components are properly updated for v6

## Monitoring

### Health Checks
- [ ] Backend health endpoint: `/health`
- [ ] Frontend accessibility
- [ ] Database connectivity

### Logs
- [ ] Backend application logs
- [ ] Frontend build logs
- [ ] Database connection logs

## Maintenance

### Regular Tasks
- [ ] Monitor application performance
- [ ] Update dependencies regularly
- [ ] Review and rotate database credentials
- [ ] Monitor usage and scaling needs
