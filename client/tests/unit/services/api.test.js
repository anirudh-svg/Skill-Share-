import axios from 'axios';
import { authAPI, userAPI } from '../../../src/services/api';

// Mock axios
jest.mock('axios');

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authAPI', () => {
    it('should call register endpoint correctly', async () => {
      const mockResponse = { data: { token: 'test-token' } };
      axios.post.mockResolvedValue(mockResponse);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await authAPI.register(userData);

      expect(axios.post).toHaveBeenCalledWith('/auth/register', userData);
      expect(response).toEqual(mockResponse);
    });

    it('should call login endpoint correctly', async () => {
      const mockResponse = { data: { token: 'test-token' } };
      axios.post.mockResolvedValue(mockResponse);

      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await authAPI.login(credentials);

      expect(axios.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(response).toEqual(mockResponse);
    });
  });

  describe('userAPI', () => {
    it('should call get all users endpoint correctly', async () => {
      const mockResponse = { data: [] };
      axios.get.mockResolvedValue(mockResponse);

      const response = await userAPI.getAll();

      expect(axios.get).toHaveBeenCalledWith('/users', { params: undefined });
      expect(response).toEqual(mockResponse);
    });

    it('should call get user by id endpoint correctly', async () => {
      const mockResponse = { data: { id: '123', name: 'Test User' } };
      axios.get.mockResolvedValue(mockResponse);

      const response = await userAPI.getById('123');

      expect(axios.get).toHaveBeenCalledWith('/users/123');
      expect(response).toEqual(mockResponse);
    });
  });
});