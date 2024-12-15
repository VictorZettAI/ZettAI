import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, handleApiError } from '../config/api';

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;
  private retryCount: Map<string, number>;

  private constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers,
    });

    this.retryCount = new Map();
    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        if (!originalRequest) {
          return Promise.reject(error);
        }

        const requestKey = `${originalRequest.method}-${originalRequest.url}`;
        const currentRetryCount = this.retryCount.get(requestKey) || 0;

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await this.api.post(API_CONFIG.endpoints.auth.refresh, { refreshToken });
            const { token } = response.data;
            
            localStorage.setItem('token', token);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            
            return this.api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        // Handle retries for specific status codes
        if (currentRetryCount < API_CONFIG.retry.attempts && this.shouldRetry(error)) {
          this.retryCount.set(requestKey, currentRetryCount + 1);
          const delay = this.calculateRetryDelay(currentRetryCount);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.api(originalRequest);
        }

        this.retryCount.delete(requestKey);
        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    const status = error.response?.status;
    return status === 408 || status === 500 || status === 502 || status === 503 || status === 504;
  }

  private calculateRetryDelay(retryCount: number): number {
    const { min, max, factor } = API_CONFIG.retry.backoff;
    const delay = min * Math.pow(factor, retryCount);
    return Math.min(delay, max);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export const apiService = ApiService.getInstance();
export default apiService;
