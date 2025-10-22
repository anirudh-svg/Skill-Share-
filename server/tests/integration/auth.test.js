const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server.js');
const User = require('../../models/User.js');

describe('Auth API', () => {
  let mongoServer;
  let agent;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    agent = request.agent(app);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        bio: 'Test bio',
        location: 'Test City'
      };

      const res = await agent
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe(userData.name);
      expect(res.body.email).toBe(userData.email);
      expect(res.body.bio).toBe(userData.bio);
      expect(res.body.location).toBe(userData.location);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 for duplicate email', async () => {
      const userData = {
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123'
      };

      // Create user first
      await agent.post('/api/auth/register').send(userData);

      // Try to create another user with same email
      const res = await agent
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(res.body.message).toBe('User already exists');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteData = {
        name: 'Test User'
        // Missing email and password
      };

      const res = await agent
        .post('/api/auth/register')
        .send(incompleteData)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'login@example.com',
        password: 'password123'
      };

      // Register user first
      await agent.post('/api/auth/register').send(userData);

      // Login with same credentials
      const res = await agent
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(res.body).toHaveProperty('_id');
      expect(res.body.email).toBe(userData.email);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await agent
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(res.body.message).toBe('Invalid email or password');
    });
  });

  describe('GET /api/auth/profile', () => {
    it('should return user profile for authenticated user', async () => {
      const userData = {
        name: 'Test User',
        email: 'profile@example.com',
        password: 'password123'
      };

      // Register and login
      const registerRes = await agent.post('/api/auth/register').send(userData);
      const token = registerRes.body.token;

      // Get profile
      const res = await agent
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.name).toBe(userData.name);
      expect(res.body.email).toBe(userData.email);
    });

    it('should return 401 for unauthenticated request', async () => {
      await agent
        .get('/api/auth/profile')
        .expect(401);
    });
  });
});