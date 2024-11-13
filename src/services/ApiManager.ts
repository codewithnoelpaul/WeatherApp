import axios, {AxiosInstance} from 'axios';

class ApiManager {
  private static instance: ApiManager;
  private apiClient: AxiosInstance;
  private geoApiClient: AxiosInstance;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/',
      timeout: 10000,
    });

    this.geoApiClient = axios.create({
      baseURL: 'https://api.openweathermap.org/geo/1.0/',
      timeout: 10000,
    });
  }

  public static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  public async get<T>(endpoint: string, params = {}): Promise<T> {
    try {
      const response = await this.apiClient.get<T>(endpoint, {params});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getGeocoding<T>(endpoint: string, params = {}): Promise<T> {
    try {
      const response = await this.geoApiClient.get<T>(endpoint, {params});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const apiManager = ApiManager.getInstance();
export default apiManager;
