# WE GROW - Deployment Guide

This guide provides instructions for deploying the WE GROW application to production environments.

##  Deployment Options

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel (Recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
- Render (Recommended)
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Google Cloud Run

##  Deployment Steps

### 1. Build the Frontend

```bash
cd client
npm run build
```

This will create a `dist` folder with the production-ready frontend files.

### 2. Environment Variables

#### Frontend Environment Variables
Create a `.env.production` file in the client directory:

```
VITE_API_URL=https://your-backend-url.com/api
VITE_SOCKET_URL=https://your-backend-url.com
```

#### Backend Environment Variables
Create a `.env.production` file in the server directory:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/we-grow?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=https://your-frontend-url.com
```

### 3. Deploy Frontend to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd client
   vercel --prod
   ```

### 4. Deploy Backend to Render (Recommended)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following build command:
   ```
   npm install
   ```
4. Set the start command:
   ```
   npm start
   ```
5. Add environment variables in the Render dashboard

### 5. Deploy Backend to Railway (Alternative)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Deploy:
   ```bash
   cd server
   railway init
   railway up
   ```

##  Environment Configuration

### MongoDB Atlas
Ensure your MongoDB Atlas cluster is configured:
1. Add your deployment IP addresses to the IP whitelist
2. Create a database user with appropriate permissions
3. Use the correct connection string format

### CORS Configuration
Make sure the `CLIENT_URL` environment variable matches your frontend URL:
```
CLIENT_URL=https://your-frontend-domain.com
```

##  Production Optimizations

### Backend Optimizations
1. Use a production MongoDB cluster
2. Enable MongoDB connection pooling
3. Use Redis for session caching (optional)
4. Implement rate limiting
5. Add monitoring and logging

### Frontend Optimizations
1. Enable gzip compression
2. Use a CDN for static assets
3. Implement service workers for offline support
4. Optimize images and assets

##  CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd client && npm install
      - run: cd client && npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./client

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd server && npm install
      - uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.PRIVATE_KEY }}
          script: |
            cd /path/to/your/app
            git pull origin main
            npm install
            pm2 restart server
```

## 📊 Monitoring and Logging

### Backend Monitoring
1. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

2. Add logging:
   ```bash
   pm2 logs
   ```

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance monitoring

##  Security Considerations

1. Use HTTPS in production
2. Set secure headers with Helmet.js
3. Implement rate limiting
4. Validate and sanitize all inputs
5. Use environment variables for secrets
6. Regular security audits

##  Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CLIENT_URL` environment variable
   - Ensure frontend and backend URLs match

2. **MongoDB Connection Failures**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Confirm database user credentials

3. **WebSocket Connection Issues**
   - Ensure WebSocket ports are open
   - Check firewall settings
   - Verify Socket.IO configuration

### Debugging Steps

1. Check server logs:
   ```bash
   # For PM2
   pm2 logs
   
   # For Render/Railway
   Check dashboard logs
   ```

2. Test API endpoints:
   ```bash
   curl https://your-api-url.com/api/health
   ```

3. Verify environment variables:
   ```bash
   # Check if variables are set
   echo $NODE_ENV
   echo $MONGODB_URI
   ```

##  Support

For deployment issues, contact:
- Repository maintainers
- Hosting platform support
- Community forums

Always keep backups of your database and environment configurations.
