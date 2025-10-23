# Test Data

This folder contains static test data files used across test scenarios.

## Structure

```
test-data/
├── users.json           # User account test data
├── products.json        # Product information (if needed)
├── orders.json          # Order data samples
└── environments/        # Environment-specific data
```

## Usage

Test data files can be loaded using the `FileHelper`:

```typescript
import { FileHelper } from '@helpers/file-helper';

const userData = await FileHelper.readJsonFile('src/test/test-data/users.json');
const email = userData.validUser.email;
const password = userData.validUser.password;
```

## Best Practices

1. **Don't commit sensitive data** - Use environment variables for credentials
2. **Use data generators** - For unique data (emails, names), use `FileHelper.generateRandomEmail()`
3. **Organize by domain** - Group related data together
4. **Document data structure** - Add comments or schema files
5. **Use realistic data** - Test data should resemble production data

## Example: users.json

```json
{
  "validUser": {
    "name": "Test User",
    "email": "testuser@automation.com",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "User",
    "dateOfBirth": {
      "day": "15",
      "month": "6",
      "year": "1990"
    },
    "company": "Test Company",
    "address": "123 Test Street",
    "country": "United States",
    "state": "California",
    "city": "Los Angeles",
    "zipcode": "90001",
    "mobileNumber": "1234567890"
  },
  "invalidUser": {
    "email": "invalid@test.com",
    "password": "WrongPassword123"
  }
}
```

## Dynamic Data Generation

For tests that require unique data on each run:

```typescript
import { FileHelper } from '@helpers/file-helper';

const uniqueEmail = FileHelper.generateRandomEmail();
const uniqueName = 'User_' + FileHelper.generateRandomString(8);
const timestamp = FileHelper.getCurrentTimestamp();
```
