# Data Directory

This folder is reserved for runtime data and data-related utilities.

## Purpose

The `data/` folder can contain:

### 1. Runtime Data (Ignored by Git)
- Dynamic test data generated during execution
- Temporary files created by tests
- Session data
- Cache files

### 2. Data Utilities (Optional)
- **Data builders** - Classes to build test data objects
- **Data providers** - Functions that provide test data
- **Data factories** - Factory patterns for creating test entities
- **Data generators** - Complex data generation logic

## Example: Data Builder Pattern

```typescript
// data/builders/user-builder.ts
export class UserBuilder {
  private user: any = {};

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  build() {
    return this.user;
  }
}

// Usage in step definitions
const user = new UserBuilder()
  .withName('John Doe')
  .withEmail('john@example.com')
  .build();
```

## Example: Data Provider

```typescript
// data/providers/product-provider.ts
export class ProductProvider {
  static getRandomProduct() {
    return {
      id: Math.floor(Math.random() * 1000),
      name: `Product ${Date.now()}`,
      price: (Math.random() * 100).toFixed(2)
    };
  }
}
```

## Folder Structure

```
data/
├── README.md           # This file
├── builders/           # (Optional) Data builder classes
├── providers/          # (Optional) Data provider functions
├── runtime/            # Runtime generated data (gitignored)
└── schemas/            # (Optional) Data validation schemas
```

## Note

Runtime data in this directory is typically excluded from version control (see `.gitignore`).

