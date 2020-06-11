import axios, { Method, AxiosRequestConfig } from 'axios';

interface RequesterOptions {
  token: string;
}

type AxiosMethod = 'get' | 'post';

/**
 * Note:
 */
export class Requester {
  requestCount: number;
  lastRequestedAt: number;
  token: string;

  constructor({ token }: RequesterOptions) {
    this.token = token;

    this.requestCount = 0;
  }

  async get<T>(url: string, options: AxiosRequestConfig = {}) {
    return await this._makeRequest<T>('get', url, options);
  }

  async _makeRequest<T>(type: AxiosMethod, url: string, options: AxiosRequestConfig, postData: any = {}) {

    let response;
    
    let enhancedOptions = this._enhanceOptions(options);

    switch (type) {
      case 'get':
        response = await axios.get<T>(url, enhancedOptions);
        return response.data;
      case 'post':
        response = await axios.post<T>(url, postData, enhancedOptions);
        return response.data;
    }
  }

  _enhanceOptions(options: AxiosRequestConfig): AxiosRequestConfig {
    let headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${this.token}`,
    };

    return {
      ...options,
      headers,
    };
  }
}