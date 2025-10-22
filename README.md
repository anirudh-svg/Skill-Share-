# WE GROW - Community Skill Exchange Platform

A peer-to-peer learning platform where users can exchange skills directly.

##  Overview

WE GROW is a community-driven platform that enables people to trade skills directly — for example, one user can teach Python in exchange for guitar lessons. The goal is to promote peer-to-peer learning and community growth, especially in low-income areas where paid courses may not be accessible.

##  Core Features

### User Authentication
- Email & password login
- JWT authentication for backend sessions
- Basic onboarding form: name, bio, location, profile picture, and skill tags

### Profile System
- Skills offered/wanted with experience levels
- Reviews & ratings
- Option to edit/update skills anytime

### Skill Marketplace
- Search and filter users by skill or location
- "Request Trade" button to initiate skill exchange
- Matching system recommendations

### Booking & Scheduling
- Send/accept booking requests
- Integrated calendar UI
- Notifications for bookings

### Real-Time Chat
- 1-on-1 chat between matched users
- Message history stored in MongoDB
- Typing indicators and read receipts

### Review & Rating System
- 1-5 star ratings after sessions
- Written feedback on profiles

##  Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (with Mongoose ORM)
- **Real-time Communication**: Socket.io
- **Authentication**: JWT
- **Deployment**: Vercel (frontend) + Render/Railway (backend)

##  Project Structure

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

##  Getting Started

For detailed setup and development instructions, please refer to [DEVELOPMENT.md](DEVELOPMENT.md)

### Database Configuration

This project supports both local MongoDB installations and MongoDB Atlas clusters. Follow the instructions in [DEVELOPMENT.md](DEVELOPMENT.md) to configure your database connection.

##  UI/UX Guidelines

- Modern minimalist layout with clean typography
- Dark theme by default, with toggle option
- Responsive grid for skill listings
- Profile cards with image, skill chips, "Chat Now" and "Request Trade" buttons
- Booking modal styled like Google Calendar pop-up
- Chat interface inspired by Discord or WhatsApp Web

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to your fork
6. Create a pull request

##  Deployment

For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deployment Steps

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Set up environment variables in both client and server directories

3. Deploy frontend to Vercel/Netlify

4. Deploy backend to Render/Railway

5. Configure environment variables in your deployment platforms

## 🧪 Testing

This project includes a comprehensive test suite with unit, integration, and E2E tests for both frontend and backend components.

For detailed information about the testing strategy and results, please refer to [TEST_REPORT.md](TEST_REPORT.md)

### Running Tests

- `npm test` - Run all tests
- `npm run test:client` - Run frontend tests only
- `npm run test:server` - Run backend tests only
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

##  Project Management Scripts

This project includes helpful scripts in the root `package.json`:

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm run start` - Start the backend server
- `npm run clean` - Remove all node_modules directories
- `npm run reinstall` - Clean and reinstall all dependencies
- `npm run lint` - Run linting on both frontend and backend

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Security Notice

For security reasons, all sensitive credentials have been removed from this repository. Please use your own MongoDB Atlas credentials and JWT secret when setting up the application. See [DEVELOPMENT.md](DEVELOPMENT.md) for setup instructions.
