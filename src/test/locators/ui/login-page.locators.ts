export class LoginPageLocators {
  // Login Section
  static readonly LOGIN_EMAIL = '[data-qa="login-email"]';
  static readonly LOGIN_PASSWORD = '[data-qa="login-password"]';
  static readonly LOGIN_BUTTON = '[data-qa="login-button"]';
  static readonly LOGIN_FORM_TITLE = '.login-form h2';

  // Signup Section
  static readonly SIGNUP_NAME = '[data-qa="signup-name"]';
  static readonly SIGNUP_EMAIL = '[data-qa="signup-email"]';
  static readonly SIGNUP_BUTTON = '[data-qa="signup-button"]';
  static readonly SIGNUP_FORM_TITLE = '.signup-form h2';

  // Error Messages
  static readonly ERROR_MESSAGE = '.login-form p';
  static readonly INCORRECT_LOGIN_MESSAGE = 'text=Your email or password is incorrect!';
  static readonly EMAIL_EXISTS_MESSAGE = 'text=Email Address already exist!';
}
