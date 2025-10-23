import { ApiClient } from '@core/api-client';

export class UserApiService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getUserDetailByEmail(email: string) {
    return await this.apiClient.get(`/getUserDetailByEmail?email=${email}`);
  }

  async createUser(userData: any) {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    return await this.apiClient.post('/createAccount', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async updateUserAccount(userData: any) {
    return await this.apiClient.put('/updateAccount', userData);
  }

  async deleteUserAccount(email: string, password: string) {
    return await this.apiClient.delete('/deleteAccount', {
      data: { email, password }
    });
  }
}
