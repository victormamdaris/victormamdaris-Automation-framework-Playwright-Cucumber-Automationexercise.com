export class ContactPageLocators {
  // Contact Form
  static readonly GET_IN_TOUCH_TITLE = 'text=Get In Touch';
  static readonly NAME_INPUT = '[data-qa="name"]';
  static readonly EMAIL_INPUT = '[data-qa="email"]';
  static readonly SUBJECT_INPUT = '[data-qa="subject"]';
  static readonly MESSAGE_TEXTAREA = '[data-qa="message"]';
  static readonly UPLOAD_FILE = 'input[name="upload_file"]';
  static readonly SUBMIT_BUTTON = '[data-qa="submit-button"]';
  
  // Success Message
  static readonly SUCCESS_MESSAGE = '.status.alert.alert-success';
  static readonly HOME_BUTTON = '.btn.btn-success';
}
