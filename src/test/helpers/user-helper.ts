export class UserHelper {
  static generateRandomUser() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    
    return {
      name: `TestUser${random}`,
      email: `testuser${timestamp}${random}@automation.test`,
      password: `Test@${timestamp}`,
      title: 'Mr',
      birth_date: '15',
      birth_month: '6',
      birth_year: '1990',
      firstname: 'Test',
      lastname: `User${random}`,
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 4B',
      country: 'United States',
      zipcode: '90001',
      state: 'California',
      city: 'Los Angeles',
      mobile_number: '1234567890'
    };
  }

  static generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `testuser${timestamp}${random}@automation.test`;
  }

  static generateRandomPassword(): string {
    const timestamp = Date.now();
    return `Test@${timestamp}`;
  }
}
