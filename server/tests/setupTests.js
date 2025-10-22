// Setup tests for Node.js backend
const mongoose = require('mongoose');

// Set timeout for tests
jest.setTimeout(30000);

// Mock environment variables
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/we-grow-test';

// Close MongoDB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});