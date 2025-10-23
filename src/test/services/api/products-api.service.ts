import { ApiClient } from '@core/api-client';

export class ProductsApiService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getAllProductsList() {
    return await this.apiClient.get('/api/productsList');
  }

  async searchProduct(searchTerm: string) {
    const formData = `search_product=${encodeURIComponent(searchTerm)}`;
    
    return await this.apiClient.post('/api/searchProduct', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  async getAllBrandsList() {
    return await this.apiClient.get('/api/brandsList');
  }
}
