# WE GROW - Testing Guide

This guide explains how to run and write tests for the WE GROW application.

For a comprehensive test report with results and coverage metrics, please refer to [TEST_REPORT.md](TEST_REPORT.md).

## 🧪 Testing Structure

```
we-grow/
├── client/
│   ├── tests/
│   │   ├── unit/          # Unit tests for components, hooks, utilities
│   │   ├── integration/   # Integration tests for API services
│   │   ├── e2e/           # End-to-end tests
│   │   ├── __mocks__/     # Mock files for testing
│   │   └── setupTests.js  # Test setup configuration
│   └── jest.config.js     # Jest configuration for frontend
├── server/
│   ├── tests/
│   │   ├── unit/          # Unit tests for models, controllers, middleware
│   │   ├── integration/   # Integration tests for API endpoints
│   │   ├── e2e/           # End-to-end tests
│   │   └── setupTests.js  # Test setup configuration
│   └── jest.config.js     # Jest configuration for backend
└── TESTING.md             # This file
```

## 🧪 Testing Commands

### Frontend Testing

```bash
# Run all frontend tests
cd client
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Backend Testing

```bash
# Run all backend tests
cd server
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Root Testing (Both Frontend and Backend)

```bash
# Run tests for both frontend and backend
npm run test:client
npm run test:server
npm run test:all
```

## 🧪 Test Types

### Unit Tests
Unit tests focus on individual functions, components, or modules in isolation.

**Frontend Unit Tests:**
- Component rendering and behavior
- Hook functionality
- Utility functions
- Service functions

**Backend Unit Tests:**
- Model validation and methods
- Controller logic
- Middleware functionality
- Utility functions

### Integration Tests
Integration tests verify that different parts of the application work together correctly.

**Frontend Integration Tests:**
- API service interactions
- Context provider behavior
- Complex component interactions

**Backend Integration Tests:**
- API endpoint responses
- Database operations
- Authentication flow
- External service integrations

### End-to-End Tests
E2E tests simulate real user scenarios across the entire application.

**Frontend E2E Tests:**
- User registration and login flows
- Profile management
- Skill marketplace interactions
- Booking and chat functionality

## 🧪 Writing Tests

### Frontend Test Guidelines

1. **Component Tests:**
   - Test rendering with different props
   - Test user interactions (clicks, inputs)
   - Test state changes
   - Test navigation behavior

2. **Hook Tests:**
   - Test initial state
   - Test state updates
   - Test side effects
   - Test cleanup functions

3. **Utility Tests:**
   - Test all code paths
   - Test edge cases
   - Test error conditions
   - Test return values

### Backend Test Guidelines

1. **Model Tests:**
   - Test schema validation
   - Test instance methods
   - Test static methods
   - Test virtual properties

2. **Controller Tests:**
   - Test successful responses
   - Test error responses
   - Test validation
   - Test authorization

3. **Middleware Tests:**
   - Test successful middleware execution
   - Test error handling
   - Test early termination
   - Test side effects

## 🧪 Mocking Strategy

### Frontend Mocking
- Use `jest.mock()` for module mocking
- Use `__mocks__` directory for file imports
- Mock API calls with `axios` or `fetch`
- Mock browser APIs when needed

### Backend Mocking
- Use `mongodb-memory-server` for database testing
- Mock external services
- Mock file system operations
- Mock environment variables

## 🧪 Test Coverage

The project aims for the following coverage targets:
- **Unit Tests**: 80% coverage
- **Integration Tests**: 70% coverage
- **E2E Tests**: 60% coverage of critical user flows

Run `npm run test:coverage` to see current coverage reports.

## 🧪 Continuous Integration

Tests are automatically run in the CI pipeline:
1. On every pull request
2. Before merging to main branch
3. On scheduled builds

## 🧪 Best Practices

1. **Test Naming:**
   - Use descriptive test names
   - Follow the "it should..." pattern
   - Group related tests in describes

2. **Test Structure:**
   - Arrange-Act-Assert pattern
   - Keep tests focused and isolated
   - Clean up after each test

3. **Mocking:**
   - Mock only what's necessary
   - Avoid over-mocking
   - Test real behavior when possible

4. **Performance:**
   - Keep tests fast
   - Use appropriate timeouts
   - Parallelize when possible

## 🧪 Troubleshooting

### Common Issues

1. **Async Test Failures:**
   - Use `async/await` properly
   - Use `done()` callback for callbacks
   - Increase test timeout if needed

2. **Mock Issues:**
   - Clear mocks between tests
   - Reset modules when needed
   - Check mock implementation

3. **Database Issues:**
   - Ensure clean database state
   - Use transactions for cleanup
   - Handle connection errors

### Debugging Tips

1. Use `console.log` for debugging (remove before committing)
2. Use Jest's `--verbose` flag for detailed output
3. Use `--testNamePattern` to run specific tests
4. Use `--watch` mode for development

## 🧪 Adding New Tests

1. Create test file in appropriate directory
2. Follow existing test patterns
3. Add necessary imports and mocks
4. Write test cases for all scenarios
5. Run tests to verify they pass
6. Check coverage to ensure adequacy

## 🧪 Test Dependencies

The project uses the following testing libraries:

**Frontend:**
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - DOM assertions
- `@testing-library/user-event` - User event simulation
- `jest` - Test runner and assertion library
- `jsdom` - DOM environment for Node.js

**Backend:**
- `jest` - Test runner and assertion library
- `supertest` - HTTP assertions
- `mongodb-memory-server` - In-memory MongoDB for testing

## 🧪 CI/CD Integration

Tests are integrated into the CI/CD pipeline:
- Run on every code push
- Block deployment on test failures
- Generate coverage reports
- Send notifications on failures