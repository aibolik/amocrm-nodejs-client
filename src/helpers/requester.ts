import axios, { AxiosRequestConfig } from 'axios';

interface RequesterOptions {
  token: string;
}

type AxiosMethod = 'get' | 'post';

// amoCRM API rate limits 7 requests per second
// https://www.amocrm.ru/developers/content/api/recommendations
const BASE_WAIT_TIME = 1000;
const MAX_RETRIES = 5;

axios.interceptors.response.use(null, (error) => {
  const url = error?.config?.url ?? '';

  if (error?.response?.status >= 500 
    && error?.response?.status < 600
    && Boolean(url)
    && url.indexOf('.z1.amocrm.') === -1) {
    error.config.url = Requester.getSafeMirror(error.config.url);
    return axios.request(error.config);
  }

  return Promise.reject(error);
});

axios.interceptors.response.use(null, (error) => {
  if (error?.response?.status === 429) {
    const retryCount = error.config.retryCount || 0;
    
    if (retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // Exponential backoff with jitter for rate limiting
    const jitter = Math.floor(Math.random() * 5000); // Add 0-5s random jitter
    const totalWaitTime = BASE_WAIT_TIME * Math.pow(2, retryCount) + jitter;

    return new Promise(resolve => {
      setTimeout(() => {
        error.config.retryCount = retryCount + 1;
        resolve(axios.request(error.config));
      }, totalWaitTime);
    });
  }

  return Promise.reject(error);
});

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

  async post<T>(url: string, postData: any, options: AxiosRequestConfig = {}) {
    return await this._makeRequest<T>('post', url, options, postData);
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

  static getSafeMirror(url: string) {
    return url.replace(/\.amocrm\./, `.z1.amocrm.`);
  }
}