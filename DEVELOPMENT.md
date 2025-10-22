# WE GROW - Development Guide

## Project Structure

```
we-grow/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── utils/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── context/
│   └── package.json
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── package.json     # Root package.json for project management
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration using your actual credentials:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

### 2. Frontend Setup

```bash
cd client
npm install
```

### 3. Running the Application

#### Start the backend server:

```bash
cd server
npm run dev
```

#### Start the frontend development server:

```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id/rating` - Add rating to user

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/popular` - Get popular skills
- `POST /api/skills` - Create a new skill

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status

### Chat
- `POST /api/chat/send` - Send a message
- `GET /api/chat/conversation/:userId` - Get conversation
- `GET /api/chat/unread-count` - Get unread messages count

### Reviews
- `POST /api/reviews` - Create a review
- `GET /api/reviews/user/:userId` - Get user reviews

## Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests if applicable
5. Commit your changes
6. Push to your fork
7. Create a pull request

## Deployment

### Frontend
The frontend can be deployed to Vercel, Netlify, or any static hosting service.

### Backend
The backend can be deployed to Render, Railway, Heroku, or any Node.js hosting service.

Make sure to set the environment variables in your deployment environment.