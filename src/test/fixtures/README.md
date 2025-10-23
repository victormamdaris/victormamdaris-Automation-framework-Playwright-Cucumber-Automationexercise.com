# Fixtures Directory

This folder contains test fixtures - reusable mock data, API responses, and test configurations.

## Purpose

Fixtures provide:
- **Mock API responses** for testing without real API calls
- **Static test data** that doesn't change between runs
- **Reusable configurations** for different test scenarios
- **Database seeds** for integration tests

## Structure

```
fixtures/
├── api-responses/          # Mock API response data
│   ├── users/
│   │   ├── login-success.json
│   │   ├── login-failure.json
│   │   └── user-details.json
│   └── products/
│       ├── product-list.json
│       └── product-details.json
├── ui-states/              # Saved UI states
└── mock-data/              # Other mock data
```

## Examples

### API Response Fixtures

**fixtures/api-responses/users/login-success.json**
```json
{
  "responseCode": 200,
  "message": "User exists!",
  "user": {
    "id": 123,
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Using Fixtures in Tests

```typescript
import { FileHelper } from '@helpers/file-helper';

// Load fixture
const mockResponse = await FileHelper.readJsonFile(
  'src/test/fixtures/api-responses/users/login-success.json'
);

// Use in API mocking
await page.route('**/api/verifyLogin', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockResponse)
  });
});
```

### Configuration Fixtures

**fixtures/browser-configs/mobile-config.json**
```json
{
  "viewport": {
    "width": 375,
    "height": 667
  },
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
  "deviceScaleFactor": 2
}
```

## Use Cases

1. **API Testing** - Mock API responses for offline testing
2. **Error Scenarios** - Test error handling with predefined error responses
3. **Data Consistency** - Use same data across multiple tests
4. **Performance** - Avoid real API calls during development
5. **Isolation** - Test components independently

## Best Practices

- Keep fixtures small and focused
- Document the purpose of each fixture file
- Update fixtures when API contracts change
- Version control all fixtures
- Use realistic data that mirrors production

## vs. test-data/

- **fixtures/** - Mock responses, configurations, reusable setup
- **test-data/** - Actual input data for test execution

