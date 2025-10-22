const jwt = require('jsonwebtoken');
const User = require('../../../models/User.js');
const { registerUser, loginUser } = require('../../../controllers/authController.js');

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../../../models/User');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        bio: 'Test bio',
        location: 'Test City'
      };

      req.body = userData;

      const mockUser = {
        _id: 'user123',
        ...userData,
        skillsOffered: [],
        skillsWanted: [],
        averageRating: 0
      };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('test-jwt-token');

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(User.create).toHaveBeenCalledWith({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        bio: userData.bio,
        location: userData.location
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 'user123' },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'user123',
        name: userData.name,
        email: userData.email,
        bio: userData.bio,
        location: userData.location,
        profilePicture: undefined,
        skillsOffered: [],
        skillsWanted: [],
        averageRating: 0,
        token: 'test-jwt-token'
      });
    });

    it('should return 400 if user already exists', async () => {
      req.body = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await registerUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'existing@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      req.body = credentials;

      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        bio: 'Test bio',
        location: 'Test City',
        profilePicture: '',
        skillsOffered: [],
        skillsWanted: [],
        averageRating: 0,
        comparePassword: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('test-jwt-token');

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: credentials.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(credentials.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 'user123' },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      expect(res.json).toHaveBeenCalledWith({
        _id: 'user123',
        name: 'Test User',
        email: 'test@example.com',
        bio: 'Test bio',
        location: 'Test City',
        profilePicture: undefined,
        skillsOffered: [],
        skillsWanted: [],
        averageRating: 0,
        token: 'test-jwt-token'
      });
    });

    it('should return 401 for invalid email', async () => {
      req.body = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    it('should return 401 for invalid password', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findOne.mockResolvedValue(mockUser);

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });
});