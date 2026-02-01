# Startup Benefits Platform

A full-stack web application that provides exclusive SaaS deals and benefits for early-stage startups.

## Overview

This platform helps startup founders and early-stage teams access exclusive discounts on premium SaaS tools. Some deals are publicly available, while others require user verification.


### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- CSS (custom styling)
- Axios for API calls



### Backend Setup
```bash
cd backend
npm install
cp .env.example .env

npm run dev
# Server runs on http://localhost:5000
```

### Seed Database (Optional)
```bash
cd backend
node seed.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```
