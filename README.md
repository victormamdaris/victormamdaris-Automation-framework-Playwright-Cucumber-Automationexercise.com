# Automation Test Framework - Playwright + Cucumber (UI & API)

A comprehensive automation testing framework built with **Playwright** and **Cucumber BDD** for testing [AutomationExercise.com](https://automationexercise.com). Supports both **UI** and **API** testing with clean separation and reusable components.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Tags](#-test-tags)
- [API Testing](#-api-testing)
- [UI Testing](#-ui-testing)
- [GitHub Actions](#-github-actions)
- [Reports](#-reports)
- [Writing Tests](#-writing-tests)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- ✅ **BDD Framework** with Cucumber for readable test scenarios
- ✅ **Dual Testing** - Both UI and API tests in one framework
- ✅ **Page Object Model** design pattern for UI tests
- ✅ **API Services** layer for clean API test organization
- ✅ **Multi-browser support** (Chromium, Firefox, WebKit)
- ✅ **Multi-environment support** (Dev, Staging, Production)
- ✅ **Tag-based execution** for flexible test runs
- ✅ **Parallel execution** support for both UI and API
- ✅ **Automatic screenshots** on test failures
- ✅ **HTML Reports** with detailed test results
- ✅ **Serenity BDD Reports** with interactive dashboards (opens directly in browser!)
- ✅ **CI/CD Integration** with GitHub Actions
- ✅ **TypeScript** for type safety
- ✅ **Separated folder structure** for UI and API tests

## 🛠 Tech Stack

- **Playwright** - Browser automation
- **Cucumber** - BDD framework
- **TypeScript** - Programming language
- **Node.js** - Runtime environment
- **Serenity BDD** - Interactive test reporting with rich visualizations
- **Multiple Cucumber HTML Reporter** - Additional test reporting

## 📁 Project Structure

```
src/test/
├── config/              # Configuration files
│   └── environment.config.ts
├── core/                # Core framework utilities
│   ├── base-page.ts
│   ├── browser-manager.ts
│   └── api-client.ts        # NEW: API client for requests
├── data/                # Test data storage
├── features/            # Cucumber feature files (BDD scenarios)
│   ├── api/                  # NEW: API test scenarios
│   │   ├── authentication/
│   │   ├── products/
│   │   ├── cart/
│   │   └── users/
│   └── ui/                   # UI test scenarios
│       ├── authentication/
│       ├── products/
│       ├── cart/
│       └── contact/
├── fixtures/            # Test fixtures
├── helpers/             # Helper functions
│   ├── assertion-helper.ts
│   ├── file-helper.ts
│   └── api-helper.ts        # NEW: API testing utilities
├── locators/            # Web element locators (UI)
│   ├── home-page.locators.ts
│   ├── login-page.locators.ts
│   ├── signup-page.locators.ts
│   ├── products-page.locators.ts
│   ├── cart-page.locators.ts
│   └── contact-page.locators.ts
├── pages/               # Page Object Model classes (UI)
│   └── ui/
│       ├── home/
│       ├── authentication/
│       ├── products/
│       ├── cart/
│       └── contact/
├── services/            # NEW: API services
│   └── api/
│       ├── authentication-api.service.ts
│       ├── products-api.service.ts
│       └── user-api.service.ts
├── report/              # Report generation
│   └── generate-report.js
├── resources/           # Additional resources
├── steps/               # Step definitions
│   ├── api/                  # NEW: API step definitions
│   │   ├── authentication/
│   │   ├── products/
│   │   ├── cart/
│   │   └── users/
│   └── ui/                   # UI step definitions
│       ├── authentication/
│       ├── products/
│       ├── cart/
│       └── contact/
├── support/             # Cucumber support files
│   ├── custom-world.ts
│   └── hooks.ts
├── test-data/           # Test data files
│   ├── users.json
│   ├── products.json
│   └── contact.json
└── types/               # TypeScript type definitions
    ├── config.types.ts
    └── custom.types.ts
```

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/victormamdaris/Automation-framework-Playwright-Cucumber-Automationexercise.com.git
   cd Automation-framework-Playwright-Cucumber-Automationexercise.com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables:**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit with your preferences
   # For local development, use .env
   # For secrets, use .env.local (never commit this!)
   ```

## ⚙️ Configuration

### Environment Files

The framework uses multiple environment configuration files:

| File | Purpose | Committed | Usage |
|------|---------|-----------|-------|
| `.env.example` | Template & documentation | ✅ Yes | Copy to `.env` for local dev |
| `.env` | Local development config | ❌ No | Your personal settings |
| `.env.local` | Local secrets | ❌ No | Passwords, API keys |
| `.env.dev` | Development environment | ✅ Yes | Used by CI for dev |
| `.env.staging` | Staging environment | ✅ Yes | Used by CI for staging |
| `.env.prod` | Production environment | ✅ Yes | Used by CI for production |

### Quick Configuration

**Local Development (.env file):**
```bash
# Environment
ENV=dev           # dev, staging, prod
BROWSER=chromium  # chromium, firefox, webkit
HEADLESS=false    # true, false
TIMEOUT=30000     # milliseconds

# Application URLs
BASE_URL=https://automationexercise.com
DEV_URL=https://automationexercise.com
STAGING_URL=https://automationexercise.com
PROD_URL=https://automationexercise.com

# Reporting
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=false
REPORT_TITLE=Test Automation Report
```

**Local Secrets (.env.local file - NEVER commit!):**
```bash
# Test User Credentials
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=YourPassword123

# API Keys (if needed)
API_KEY=your-secret-api-key
```

**GitHub Actions:**
- Workflows use `.env.dev`, `.env.staging`, `.env.prod` automatically
- Secrets are stored in GitHub Secrets (Settings → Secrets and variables → Actions)
- Add: `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`, `API_KEY` (if needed)

### Browser Configuration

- **Browser**: Choose from `chromium`, `firefox`, or `webkit`
- **Headless Mode**: Run tests with or without browser UI
- **Viewport**: Default 1920x1080

## 🧪 Running Tests

### Run All Tests
```bash
npm test                   # Run all tests (UI + API)
```

### Run by Test Type

**UI Tests Only:**
```bash
npm run test:ui            # All UI tests
npm run test:ui:smoke      # UI smoke tests only
npm run test:parallel:ui   # UI tests in parallel
```

**API Tests Only:**
```bash
npm run test:api           # All API tests
npm run test:api:smoke     # API smoke tests only
npm run test:parallel:api  # API tests in parallel
```

### Run by Tags

**Smoke Tests:**
```bash
npm run test:smoke         # All smoke tests (UI + API)
```

**Regression Tests:**
```bash
npm run test:regression    # All regression tests
```

**Feature-Based:**
```bash
npm run test:login         # Login tests (UI + API)
npm run test:registration  # Registration tests
npm run test:products      # Product tests (UI + API)
npm run test:cart          # Cart tests
npm run test:authentication # All authentication tests
```

### Run by Environment

**Development:**
```bash
npm run test:dev
```

**Staging:**
```bash
npm run test:staging
```

**Production:**
```bash
npm run test:prod
```

### Run in Parallel
```bash
npm run test:parallel       # All tests in parallel
npm run test:parallel:ui    # UI tests in parallel
npm run test:parallel:api   # API tests in parallel
```

### Custom Tag Execution
```bash
# UI only smoke tests
npx cucumber-js --tags "@smoke and @ui" src/test/features/ui/**/*.feature

# API only regression tests
npx cucumber-js --tags "@regression and @api" src/test/features/api/**/*.feature

# Combined positive tests
npx cucumber-js --tags "@positive"

# Authentication tests excluding negative
npx cucumber-js --tags "@authentication and not @negative"
```

## 🏷️ Test Tags

| Tag | Description |
|-----|-------------|
| `@api` | API tests only |
| `@ui` | UI tests only |
| `@smoke` | Critical smoke tests (UI + API) |
| `@regression` | Full regression suite |
| `@login` | Login functionality tests |
| `@registration` | User registration tests |
| `@products` | Product management tests |
| `@cart` | Shopping cart tests |
| `@checkout` | Checkout process tests |
| `@contact` | Contact us tests |
| `@positive` | Positive test scenarios |
| `@negative` | Negative test scenarios |
| `@authentication` | Authentication related tests |

## 🔌 API Testing

The framework includes comprehensive API testing capabilities:

### API Services

API services are organized by functionality:

- **AuthenticationApiService**: Login, registration, account management
- **ProductsApiService**: Product listings, search, brands
- **UserApiService**: User CRUD operations

### Example API Test

```gherkin
@api @authentication @smoke
Scenario: Verify login with valid credentials via API
  Given I have a valid user account
  When I send POST request to verify login with valid credentials
  Then the response status code should be 200
  And the response should contain "responseCode" with value 200
  And the response should contain "message" with value "User exists!"
```

### API Test Features

- ✅ RESTful API testing
- ✅ Request/Response validation
- ✅ Status code verification
- ✅ JSON response validation
- ✅ API service layer for reusability
- ✅ Separate API test data management

## 🖥️ UI Testing

UI tests follow the Page Object Model pattern:

### Page Objects

- **HomePage**: Navigation, subscription
- **LoginPage**: User authentication
- **SignupPage**: User registration
- **ProductsPage**: Product browsing, search
- **CartPage**: Shopping cart management
- **ContactPage**: Contact form

### Example UI Test

```gherkin
@ui @authentication @smoke
Scenario: Successful login with valid credentials
  Given I am on the home page
  When I navigate to login page
  And I login with valid credentials
  Then I should be logged in successfully
  And I should see my username in the header
```

### UI Test Features

- ✅ Page Object Model
- ✅ Element locators separation
- ✅ Reusable page methods
- ✅ Screenshot on failure
- ✅ Multi-browser support
- ✅ Responsive design testing

## 🔄 GitHub Actions

The framework includes **3 separate workflows** for comprehensive CI/CD testing:

### 📋 Workflows Overview

#### 1. UI Tests Workflow (`.github/workflows/ui-tests.yml`)
- **Triggers**: Push/PR to UI files, manual dispatch
- **Features**: 
  - Browser selection (Chromium, Firefox, WebKit, or All)
  - Environment selection (dev, staging, prod)
  - Headless mode toggle
  - Tag-based execution
  - Parallel browser execution
- **Artifacts**: Screenshots, videos, HTML reports

#### 2. API Tests Workflow (`.github/workflows/api-tests.yml`)
- **Triggers**: Push/PR to API files, manual dispatch, scheduled (every 6 hours)
- **Features**:
  - Environment selection
  - Tag-based execution
  - Health check monitoring
  - Scheduled smoke tests
- **Artifacts**: JSON/HTML reports

#### 3. Legacy Test Execution (`.github/workflows/test-execution.yml`)
- **Status**: Maintained for backward compatibility
- **Features**: Combined UI+API execution

### 🎯 Manual Workflow Execution

#### Running UI Tests

1. Navigate to **Actions** → **UI Tests Execution**
2. Click **Run workflow**
3. Select parameters:
   - **Environment**: `dev`, `staging`, or `prod`
   - **Browser**: `chromium`, `firefox`, `webkit`, or `all`
   - **Tags**: e.g., `@smoke`, `@login`, `@products`
   - **Headless**: `true` or `false`

#### Running API Tests

1. Navigate to **Actions** → **API Tests Execution**
2. Click **Run workflow**
3. Select parameters:
   - **Environment**: `dev`, `staging`, or `prod`
   - **Tags**: e.g., `@smoke`, `@authentication`, `@products`

### ⚡ Automatic Triggers

#### UI Tests
- **Push to main/develop**: Runs if UI-related files changed
- **Pull Requests**: Validates UI changes
- **Paths**: `src/test/features/ui/**`, `src/test/pages/**`, `src/test/steps/ui/**`

#### API Tests
- **Push to main/develop**: Runs if API-related files changed
- **Pull Requests**: Validates API changes
- **Scheduled**: Every 6 hours for health checks
- **Paths**: `src/test/features/api/**`, `src/test/services/api/**`, `src/test/steps/api/**`

### 🔐 Environment Configuration

Each workflow loads environment-specific configuration:

```bash
.env.dev      # Development environment
.env.staging  # Staging environment
.env.prod     # Production environment
```

Secrets are managed via **GitHub Secrets**:

1. Go to repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:
   - `TEST_USER_EMAIL` - Your test user email
   - `TEST_USER_PASSWORD` - Your test user password
   - `API_KEY` - API key (if required)

### 📊 Workflow Strategy

#### UI Tests Matrix
```yaml
# Smoke tests (automatic)
browsers: [chromium]
environments: [dev]

# Regression (manual @regression tag)
browsers: [chromium, firefox, webkit]
environments: [dev, staging]

# Custom (manual with any tags)
browser: Selected by user
environment: Selected by user
```

#### API Tests Matrix
```yaml
# Smoke tests (automatic/scheduled)
environments: [dev]

# Regression (manual @regression tag)
environments: [dev, staging, prod]

# Health check (scheduled)
environments: [dev, staging, prod]
```

### 📦 Artifacts & Reports

All workflows upload test results as artifacts for easy download:

#### 📊 Serenity BDD Reports (RECOMMENDED - Ready to Open!)
Artifacts with **📊** emoji contain complete Serenity reports that **open directly in browser**:
- `📊-serenity-report-ui-smoke-{browser}` - UI Smoke Tests
- `📊-serenity-report-api-smoke-{environment}` - API Smoke Tests
- `📊-serenity-report-ui-{browser}-{environment}` - Custom UI Tests
- `📊-serenity-report-api-{environment}` - Custom API Tests

**How to open:**
1. Download artifact (downloads as .zip)
2. Extract ZIP
3. Open `index.html` in browser → Complete Serenity report! 🎉

✅ **No server needed!** - Serenity reports work perfectly when opened directly!

#### 📋 Other Test Artifacts
- **Screenshots** (on failure): `screenshots-ui-{browser}-{environment}` - 7 days retention
- **Videos** (on failure): `videos-ui-{browser}-{environment}` - 7 days retention
- **Cucumber HTML Reports**: `report-ui-{browser}-{environment}` and `report-api-{environment}` - 30 days retention

---

### 📖 Guide For Non-Technical People - How to View Reports

#### 📊 Method 1: Download Serenity Report (EASIEST - RECOMMENDED!)

**Simple steps:**
1. Go to **Actions** tab on GitHub
2. Click on a workflow run (most recent)
3. Scroll down to **Artifacts** section
4. Look for artifact with **📊** in the name (e.g., `📊-serenity-report-ui-smoke-chromium`)
5. Click to download (downloads as .zip)
6. Extract ZIP → Open `index.html` in browser → Done! 🎉

✅ **Advantages:** Works perfectly, no server needed, beautiful interactive dashboard!

**Which artifact to download:**
- `📊-serenity-report-ui-smoke-chromium` - UI smoke tests
- `📊-serenity-report-api-smoke-dev` - API smoke tests
- Any artifact with **📊** and **serenity** in the name

---

#### 🆘 Troubleshooting

**Don't see artifacts with 📊:**
- Verify workflow completed (green ✓ checkmark)
- Scroll down to see "Artifacts" section

**Report doesn't open:**
- Make sure you extracted the ZIP completely
- Right-click on `index.html` → Open with → Browser (Chrome/Edge/Firefox)
- If still doesn't work, try a different browser

---

### Workflow Files

- `.github/workflows/ui-tests.yml` - UI test execution with browser selection
- `.github/workflows/api-tests.yml` - API test execution with health checks
- `.github/workflows/test-execution.yml` - Legacy combined execution

## 📊 Reports

### Serenity BDD Reports (Recommended)

The framework uses **Serenity BDD** for rich, interactive test reports with beautiful visualizations.

✅ **Major Advantage**: Serenity reports **open directly in browser** - no CORS issues, no server needed!

**Generate and View Report:**
```bash
# After running tests, generate Serenity report
npm run serenity:report

# Open the report (automatically opens in browser)
# Navigate to: target/site/serenity/index.html
```

**Features:**
- 📊 Beautiful interactive dashboards
- 📈 Test execution trends and statistics
- 🎯 Requirements coverage tracking
- 📸 Automatic screenshots on failures
- 📝 Detailed step-by-step logs with timing
- 🏷️ Tag-based filtering and categorization
- 📚 Test history and trends
- 🚀 **Opens directly in browser without server!**

**Serenity Report Structure:**
```
target/site/serenity/
├── index.html          # Main dashboard (open this!)
├── capabilities/       # Test capabilities view
├── features/           # Feature files execution
├── requirements/       # Requirements traceability
└── tags/              # Tag-based views
```

**CI/CD Integration:**
- Serenity reports are automatically generated in GitHub Actions
- Download artifacts with 📊 emoji: `📊-serenity-report-*`
- Extract ZIP and open `index.html` directly - works perfectly!

---

### HTML Reports (Alternative)

After test execution, standard Cucumber HTML reports are also generated in the `reports/` directory.

**Open Report:**
```bash
# Windows
start reports/index.html

# macOS
open reports/index.html

# Linux
xdg-open reports/index.html
```

### Report Features

- ✅ Test execution summary
- ✅ Pass/Fail statistics
- ✅ Detailed step-by-step logs
- ✅ Screenshots for failed tests
- ✅ Browser and environment information
- ✅ Execution timeline

### Generate Reports Manually
```bash
npm run report          # Generate Cucumber HTML report
npm run serenity:report # Generate Serenity BDD report
npm run serenity:clean  # Clean Serenity results
```

## ✍️ Writing Tests

### Creating a New Feature

1. **Create Feature File:**
   ```gherkin
   # src/test/features/checkout/checkout.feature
   
   @checkout
   Feature: Checkout Process
     As a user
     I want to complete checkout
     So that I can purchase products
   
     @smoke @positive
     Scenario: Successful checkout
       Given I am logged in
       And I have products in cart
       When I proceed to checkout
       Then I should complete the order successfully
   ```

2. **Create Page Object:**
   ```typescript
   // src/test/pages/checkout/checkout.page.ts
   
   import { Page } from '@playwright/test';
   import { BasePage } from '@core/base-page';
   
   export class CheckoutPage extends BasePage {
     constructor(page: Page) {
       super(page);
     }
     
     async proceedToCheckout(): Promise<void> {
       // Implementation
     }
   }
   ```

3. **Create Locators:**
   ```typescript
   // src/test/locators/checkout-page.locators.ts
   
   export class CheckoutPageLocators {
     static readonly PLACE_ORDER_BUTTON = '[data-qa="place-order"]';
     static readonly PAYMENT_METHOD = '#payment-method';
   }
   ```

4. **Create Step Definitions:**
   ```typescript
   // src/test/steps/checkout/checkout.steps.ts
   
   import { Given, When, Then } from '@cucumber/cucumber';
   import { CheckoutPage } from '@pages/checkout/checkout.page';
   
   When('I proceed to checkout', async function () {
     const checkoutPage = new CheckoutPage(this.page);
     await checkoutPage.proceedToCheckout();
   });
   ```

## 📝 Best Practices

### Feature Files
- Use descriptive scenario names
- Follow BDD Given-When-Then format
- Tag scenarios appropriately
- Keep scenarios focused and atomic

### Page Objects
- One page object per page/component
- Use descriptive method names
- Keep locators in separate files
- Avoid business logic in page objects

### Step Definitions
- Keep steps reusable
- One action per step
- Use meaningful step text
- Avoid duplicating step definitions

### Test Data
- Use JSON files for test data
- Generate dynamic data when needed
- Avoid hardcoded credentials
- Use environment-specific data

## 🐛 Troubleshooting

### Common Issues

**1. Tests failing to start:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

**2. Browser not launching:**
```bash
# Install system dependencies
npx playwright install-deps
```

**3. TypeScript errors:**
```bash
# Clean and rebuild
npm run clean
npx tsc --noEmit
```

**4. Port already in use:**
```bash
# Check running processes
lsof -i :3000
kill -9 <PID>
```

### Getting Help

- Check existing [GitHub Issues](https://github.com/victormamdaris/Automation-framework-Playwright-Cucumber-Automationexercise.com/issues)
- Create a new issue with detailed description
- Include error logs and screenshots

### GitHub Actions Permissions

**Issue**: If you encounter `Permission denied to github-actions[bot]` error when deploying reports:

**Solution**: The workflow files already include the necessary permissions:
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
```

**Enable GitHub Pages**:
1. Go to Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / Folder: `/ (root)`
4. Save

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Victor Manolache**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Note:** This README is automatically maintained. When project structure or configuration changes, update this file accordingly.

**Last Updated:** October 2025
