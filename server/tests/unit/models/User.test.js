const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../../models/User.js');

describe('User Model', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('User Creation', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        bio: 'Test bio',
        location: 'Test City'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.bio).toBe(userData.bio);
      expect(savedUser.location).toBe(userData.location);
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should hash the password before saving', async () => {
      const userData = {
        name: 'Test User',
        email: 'test2@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.password).not.toBe(userData.password);
      const isMatch = await savedUser.comparePassword(userData.password);
      expect(isMatch).toBe(true);
    });

    it('should fail to create user with duplicate email', async () => {
      const userData1 = {
        name: 'Test User 1',
        email: 'duplicate@example.com',
        password: 'password123'
      };

      const userData2 = {
        name: 'Test User 2',
        email: 'duplicate@example.com',
        password: 'password456'
      };

      await new User(userData1).save();
      
      await expect(new User(userData2).save()).rejects.toThrow();
    });
  });

  describe('User Methods', () => {
    it('should calculate average rating correctly', async () => {
      const userData = {
        name: 'Test User',
        email: 'rating@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      
      // Add some ratings
      user.ratings = [
        { userId: new mongoose.Types.ObjectId(), rating: 5 },
        { userId: new mongoose.Types.ObjectId(), rating: 4 },
        { userId: new mongoose.Types.ObjectId(), rating: 3 }
      ];

      user.calculateAverageRating();

      expect(user.averageRating).toBe(4);
      expect(user.totalRatings).toBe(3);
    });

    it('should handle empty ratings correctly', async () => {
      const userData = {
        name: 'Test User',
        email: 'emptyrating@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      user.calculateAverageRating();

      expect(user.averageRating).toBe(0);
      expect(user.totalRatings).toBe(0);
    });
  });
});