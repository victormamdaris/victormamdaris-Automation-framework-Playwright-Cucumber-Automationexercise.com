import { ApiClient } from '@core/api-client';

export class ApiHelper {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async verifyStatusCode(actualStatus: number, expectedStatus: number): Promise<boolean> {
    return actualStatus === expectedStatus;
  }

  async verifyResponseContains(response: any, key: string): Promise<boolean> {
    return response.hasOwnProperty(key);
  }

  async verifyResponseValue(response: any, key: string, expectedValue: any): Promise<boolean> {
    return response[key] === expectedValue;
  }

  extractValue(response: any, path: string): any {
    const keys = path.split('.');
    let value = response;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  async validateSchema(response: any, schema: any): Promise<boolean> {
    // Basic schema validation
    for (const key in schema) {
      if (!(key in response)) {
        return false;
      }
      
      if (typeof response[key] !== schema[key]) {
        return false;
      }
    }
    
    return true;
  }

  createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    
    for (const key in data) {
      formData.append(key, data[key]);
    }
    
    return formData;
  }

  async parseJsonResponse(response: string): Promise<any> {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      return null;
    }
  }
}
