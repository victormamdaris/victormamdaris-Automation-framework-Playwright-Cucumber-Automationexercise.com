# Services Layer

This folder contains service classes that encapsulate business logic and API interactions.

## Structure

```
services/
├── api/                          # API service classes
│   ├── authentication-api.service.ts
│   ├── products-api.service.ts
│   └── user-api.service.ts
└── ui/                          # Future: UI service classes (optional)
```

## API Services

API service classes provide methods to interact with backend APIs. Each service corresponds to a specific domain or module.

### Example Usage

```typescript
import { ApiClient } from '@core/api-client';
import { AuthenticationApiService } from '@services/api/authentication-api.service';

const apiClient = new ApiClient();
await apiClient.init();

const authService = new AuthenticationApiService(apiClient);
const response = await authService.verifyLogin('user@email.com', 'password');

console.log(response.status); // 200
console.log(response.body);   // { responseCode: 200, message: "User exists!" }

await apiClient.dispose();
```

## Creating New Services

When creating new API services:

1. Create a new file in `services/api/` folder
2. Extend or use the `ApiClient` for HTTP operations
3. Implement methods that represent API endpoints
4. Return typed responses
5. Handle errors appropriately

### Template

```typescript
import { ApiClient } from '@core/api-client';

export class YourApiService {
  constructor(private apiClient: ApiClient) {}

  async yourMethod(param: string): Promise<any> {
    return await this.apiClient.get(`/api/endpoint/${param}`);
  }

  async createResource(data: any): Promise<any> {
    return await this.apiClient.post('/api/resource', data);
  }
}
```

## UI Services (Optional)

For complex UI interactions that span multiple pages or require orchestration, you can create UI service classes here in the future.

Example: `CheckoutService`, `OrderProcessingService`, etc.
