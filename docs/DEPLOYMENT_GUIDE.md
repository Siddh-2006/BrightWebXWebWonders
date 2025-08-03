# 🚀 SportsHub Deployment Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Database Setup](#database-setup)
- [Third-Party Services](#third-party-services)
- [Security Configuration](#security-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## 🌐 Overview

SportsHub is deployed using a modern cloud-native architecture:
- **Frontend**: React.js deployed on Vercel
- **Backend**: Node.js/Express deployed on Render
- **Database**: MongoDB Atlas (cloud)
- **Media Storage**: Cloudinary
- **AI Services**: Google Gemini API

---

## ✅ Prerequisites

### **System Requirements**
- Node.js 18+ 
- npm 8+ or yarn 1.22+
- Git 2.30+
- Modern web browser

### **Accounts Needed**
- [GitHub](https://github.com) - Code repository
- [Vercel](https://vercel.com) - Frontend hosting
- [Render](https://render.com) - Backend hosting
- [MongoDB Atlas](https://cloud.mongodb.com) - Database
- [Cloudinary](https://cloudinary.com) - Media storage
- [Google Cloud](https://cloud.google.com) - AI services

---

## 🔧 Environment Setup

### **Environment Variables**

#### **Frontend (.env)**
```env
# API Configuration
VITE_BACKEND_URL=https://sportshub-backend.render.com

# AI Services
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id
```

#### **Backend (.env)**
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sportshub

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# CORS Origins
ALLOWED_ORIGINS=https://sportshub-murex.vercel.app,http://localhost:5173

# Session Configuration
SESSION_SECRET=your_session_secret_here
```

---

## 💻 Local Development

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/sportshub.git
cd sportshub
```

### **2. Backend Setup**
```bash
cd SportsHub/server
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### **3. Frontend Setup**
```bash
cd SportsHub/frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### **4. Verify Local Setup**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- Test API endpoints and features

---

## 🌍 Production Deployment

### **Frontend Deployment (Vercel)**

#### **Method 1: GitHub Integration (Recommended)**
1. **Connect Repository**
   - Login to Vercel
   - Click "New Project"
   - Import from GitHub
   - Select your SportsHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: SportsHub/frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   - Add all frontend environment variables
   - Ensure VITE_BACKEND_URL points to your Render backend

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your deployment URL

#### **Method 2: Vercel CLI**
```bash
cd SportsHub/frontend
npm install -g vercel
vercel login
vercel --prod
```

### **Backend Deployment (Render)**

#### **1. Create Web Service**
1. **Login to Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure settings:

   ```
   Name: sportshub-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: SportsHub/server
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   - Add all backend environment variables
   - Ensure MONGODB_URI is correct
   - Set NODE_ENV=production

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Get your service URL

#### **2. Configure Auto-Deploy**
- Enable auto-deploy from GitHub
- Set up branch protection rules
- Configure deployment notifications

---

## 🗄️ Database Setup

### **MongoDB Atlas Configuration**

#### **1. Create Cluster**
```bash
# Login to MongoDB Atlas
# Create new project: "SportsHub"
# Create cluster: "SportsHub-Cluster"
# Choose region closest to your backend
```

#### **2. Database Security**
```bash
# Create database user
Username: sportshub-user
Password: [generate secure password]
Roles: readWrite to sportshub database

# Network Access
# Add IP addresses:
# - 0.0.0.0/0 (for Render - not recommended for production)
# - Your specific IP ranges (recommended)
```

#### **3. Connection String**
```
mongodb+srv://sportshub-user:password@sportshub-cluster.xxxxx.mongodb.net/sportshub?retryWrites=true&w=majority
```

#### **4. Database Initialization**
```javascript
// Run these commands in MongoDB Compass or shell
use sportshub

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true })
db.clubs.createIndex({ "name": 1 }, { unique: true })
db.matches.createIndex({ "scheduledFor": 1 })
db.quizResults.createIndex({ "playerName": 1, "sport": 1 })

// Create admin user (optional)
db.users.insertOne({
  name: "Admin User",
  email: "admin@sportshub.com",
  password: "$2b$10$hashedpassword", // Use bcrypt to hash
  userType: "admin",
  createdAt: new Date()
})
```

---

## 🔌 Third-Party Services

### **Google Gemini AI Setup**

#### **1. Google Cloud Console**
```bash
# 1. Go to Google Cloud Console
# 2. Create new project or select existing
# 3. Enable Generative AI API
# 4. Create API key
# 5. Restrict API key (recommended):
#    - Application restrictions: HTTP referrers
#    - API restrictions: Generative Language API
```

#### **2. API Key Configuration**
```javascript
// Backend: utils/geminiApiManager.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

### **Cloudinary Setup**

#### **1. Account Configuration**
```bash
# 1. Create Cloudinary account
# 2. Get cloud name, API key, and secret
# 3. Configure upload presets
# 4. Set up transformations for optimization
```

#### **2. Upload Configuration**
```javascript
// Backend: config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
```

---

## 🔒 Security Configuration

### **SSL/TLS Setup**
- **Vercel**: Automatic SSL certificates
- **Render**: Automatic SSL certificates
- **Custom Domain**: Configure DNS records

### **CORS Configuration**
```javascript
// Backend: app.js
app.use(cors({
  origin: [
    "https://your-frontend-domain.vercel.app",
    "http://localhost:5173" // Development only
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
```

### **Environment Security**
```bash
# Use strong, unique secrets
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Rotate secrets regularly
# Use different secrets for different environments
# Never commit secrets to version control
```

### **Rate Limiting**
```javascript
// Backend: Add rate limiting middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

---

## 📊 Monitoring & Maintenance

### **Application Monitoring**

#### **Render Monitoring**
```bash
# Built-in monitoring includes:
# - CPU and memory usage
# - Response times
# - Error rates
# - Deployment history
```

#### **Vercel Analytics**
```bash
# Enable Vercel Analytics:
# 1. Go to project settings
# 2. Enable Analytics
# 3. View performance metrics
```

### **Database Monitoring**
```bash
# MongoDB Atlas provides:
# - Performance metrics
# - Query optimization suggestions
# - Alert configuration
# - Backup management
```

### **Custom Monitoring**
```javascript
// Backend: Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### **Logging Setup**
```javascript
// Backend: Enhanced logging
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## 🔄 CI/CD Pipeline

### **GitHub Actions (Optional)**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd SportsHub/server && npm install
          cd ../frontend && npm install
      - name: Run tests
        run: |
          cd SportsHub/server && npm test
          cd ../frontend && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        # Render auto-deploys on push to main
        run: echo "Deploying to Render..."
      - name: Deploy to Vercel
        # Vercel auto-deploys on push to main
        run: echo "Deploying to Vercel..."
```

---

## 🐛 Troubleshooting

### **Common Deployment Issues**

#### **Build Failures**
```bash
# Frontend build issues
# Check Node.js version compatibility
# Verify all dependencies are installed
# Check for TypeScript errors
# Ensure environment variables are set

# Backend deployment issues
# Check Node.js version
# Verify MongoDB connection string
# Check environment variables
# Review server logs
```

#### **CORS Issues**
```javascript
// Ensure frontend URL is in CORS origins
// Check protocol (http vs https)
// Verify credentials: true setting
// Check preflight requests
```

#### **Database Connection Issues**
```bash
# Check MongoDB Atlas network access
# Verify connection string format
# Test connection from local environment
# Check database user permissions
```

#### **API Key Issues**
```bash
# Verify API keys are correctly set
# Check API key restrictions
# Monitor API usage limits
# Test API endpoints individually
```

### **Performance Optimization**

#### **Frontend Optimization**
```javascript
// Code splitting
const LazyComponent = lazy(() => import('./Component'));

// Image optimization
// Use Cloudinary transformations
// Implement lazy loading
// Optimize bundle size
```

#### **Backend Optimization**
```javascript
// Database indexing
// Query optimization
// Caching strategies
// Connection pooling
```

### **Backup & Recovery**

#### **Database Backups**
```bash
# MongoDB Atlas automatic backups
# Configure backup retention
# Test restore procedures
# Document recovery processes
```

#### **Code Backups**
```bash
# Git repository backups
# Multiple remote repositories
# Regular commits and tags
# Branch protection rules
```

---

## 📝 Deployment Checklist

### **Pre-Deployment**
- [ ] All environment variables configured
- [ ] Database connections tested
- [ ] API keys validated
- [ ] CORS settings verified
- [ ] SSL certificates ready
- [ ] Domain names configured

### **Deployment**
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Database accessible
- [ ] Third-party services connected
- [ ] Health checks passing

### **Post-Deployment**
- [ ] All features tested in production
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Backup systems verified
- [ ] Documentation updated

---

## 🎯 Production Best Practices

### **Security**
- Use HTTPS everywhere
- Implement proper authentication
- Validate all inputs
- Regular security audits
- Keep dependencies updated

### **Performance**
- Monitor response times
- Optimize database queries
- Use CDN for static assets
- Implement caching strategies
- Regular performance testing

### **Reliability**
- Set up monitoring and alerts
- Implement graceful error handling
- Plan for disaster recovery
- Regular backups
- Load testing

### **Maintenance**
- Regular dependency updates
- Security patch management
- Performance optimization
- Feature flag management
- Documentation updates

---

## 📞 Support

### **Getting Help**
- **Documentation**: Check all documentation files
- **GitHub Issues**: Report technical problems
- **Email**: support@sportshub.com
- **Community**: Join our Discord/Slack

### **Emergency Contacts**
- **Critical Issues**: emergency@sportshub.com
- **Security Issues**: security@sportshub.com
- **On-call Support**: Available 24/7 for production issues

---

This deployment guide provides comprehensive instructions for deploying SportsHub to production. Follow each section carefully and test thoroughly before going live. For additional support, refer to the platform-specific documentation or contact our support team.

**Ready to deploy?** Start with the local development setup, then proceed to production deployment step by step. Good luck! 🚀