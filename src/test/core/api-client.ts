import { APIRequestContext, request } from '@playwright/test';
import config from '@config/environment.config';

export class ApiClient {
  private context!: APIRequestContext;
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.environment.baseUrl;
  }

  async init(): Promise<void> {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async get(endpoint: string, options?: any) {
    const response = await this.context.get(endpoint, options);
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response)
    };
  }

  async post(endpoint: string, data?: any, options?: any) {
    const response = await this.context.post(endpoint, {
      data,
      ...options
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response)
    };
  }

  async put(endpoint: string, data?: any, options?: any) {
    const response = await this.context.put(endpoint, {
      data,
      ...options
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response)
    };
  }

  async patch(endpoint: string, data?: any, options?: any) {
    const response = await this.context.patch(endpoint, {
      data,
      ...options
    });
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response)
    };
  }

  async delete(endpoint: string, options?: any) {
    const response = await this.context.delete(endpoint, options);
    return {
      status: response.status(),
      headers: response.headers(),
      body: await this.parseResponse(response)
    };
  }

  private async parseResponse(response: any) {
    const contentType = response.headers()['content-type'];
    
    if (contentType && contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    }
    
    return await response.text();
  }

  async dispose(): Promise<void> {
    await this.context.dispose();
  }

  getContext(): APIRequestContext {
    return this.context;
  }
}
