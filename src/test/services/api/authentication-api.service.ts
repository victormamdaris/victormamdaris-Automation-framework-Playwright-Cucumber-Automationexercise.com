import { ApiClient } from '@core/api-client';

export class AuthenticationApiService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async verifyLogin(email: string, password: string) {
    const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    return await this.apiClient.post('/api/verifyLogin', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  async createAccount(userData: {
    name: string;
    email: string;
    password: string;
    title: string;
    birth_date: string;
    birth_month: string;
    birth_year: string;
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    zipcode: string;
    state: string;
    city: string;
    mobile_number: string;
  }) {
    const formData = new URLSearchParams(userData as any).toString();
    
    return await this.apiClient.post('/api/createAccount', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  async deleteAccount(email: string, password: string) {
    const formData = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    return await this.apiClient.delete('/api/deleteAccount', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    });
  }

  async getUserAccountDetails(email: string) {
    return await this.apiClient.get(`/api/getUserDetailByEmail?email=${encodeURIComponent(email)}`);
  }

  async updateAccount(userData: any) {
    const formData = new URLSearchParams(userData).toString();
    
    return await this.apiClient.put('/api/updateAccount', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}
