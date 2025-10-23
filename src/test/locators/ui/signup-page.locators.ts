export class SignupPageLocators {
  // Account Information
  static readonly TITLE_MR = '#id_gender1';
  static readonly TITLE_MRS = '#id_gender2';
  static readonly PASSWORD = '[data-qa="password"]';
  static readonly DAY_OF_BIRTH = '[data-qa="days"]';
  static readonly MONTH_OF_BIRTH = '[data-qa="months"]';
  static readonly YEAR_OF_BIRTH = '[data-qa="years"]';
  static readonly NEWSLETTER_CHECKBOX = '#newsletter';
  static readonly SPECIAL_OFFERS_CHECKBOX = '#optin';

  // Address Information
  static readonly FIRST_NAME = '[data-qa="first_name"]';
  static readonly LAST_NAME = '[data-qa="last_name"]';
  static readonly COMPANY = '[data-qa="company"]';
  static readonly ADDRESS1 = '[data-qa="address"]';
  static readonly ADDRESS2 = '[data-qa="address2"]';
  static readonly COUNTRY = '[data-qa="country"]';
  static readonly STATE = '[data-qa="state"]';
  static readonly CITY = '[data-qa="city"]';
  static readonly ZIPCODE = '[data-qa="zipcode"]';
  static readonly MOBILE_NUMBER = '[data-qa="mobile_number"]';

  // Buttons
  static readonly CREATE_ACCOUNT_BUTTON = '[data-qa="create-account"]';

  // Success Messages
  static readonly ACCOUNT_CREATED_MESSAGE = '[data-qa="account-created"]';
  static readonly CONTINUE_BUTTON = '[data-qa="continue-button"]';
}
