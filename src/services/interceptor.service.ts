import type {
   AxiosError,
   AxiosInstance,
   AxiosResponse,
   InternalAxiosRequestConfig,
   Method
} from 'axios';
import axios from 'axios';
import loaderService from '@/src/services/loader.service';
import { authStore } from '@/src/context/AuthWrapper';
import clearCurrentUserData from '@/src/utils/clear-user-data.utils';

class InterceptorService {
   instance: AxiosInstance;
   currentApiQueue: number = 0;

   constructor() {
      this.instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_INFINITY_API_DOMAIN });
      this.interceptRequest();
   }

   get defaultHeaders() {
      const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

      if (authStore.jwtToken) {
         headers['Authorization'] = `Bearer ${authStore.jwtToken}`;
      }
      if (authStore.tenantId) {
         headers['x-tenant-id'] = authStore.tenantId;
      }

      return headers;
   }

   private interceptRequest() {
      this.instance.interceptors.request.use(
         (config: InternalAxiosRequestConfig<unknown>) => config,
         (error: AxiosError) => Promise.reject(error)
      );

      this.instance.interceptors.response.use(
         (response: AxiosResponse) => response,
         (error: AxiosError) => {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
               clearCurrentUserData();
               return;
            }
            return Promise.reject(error);
         }
      );
   }

   async request(method: Method, url: string, data: null | unknown = null, customHeaders = {}) {
      this.currentApiQueue++;

      const headers: { [key: string]: string } = { ...this.defaultHeaders, ...customHeaders };
      const source = axios.CancelToken.source();
      const config: { [key: string]: unknown } = {
         method,
         url,
         headers,
         cancelToken: source.token
      };

      if (data) {
         config.data = data;
      }

      loaderService.showLoader();

      try {
         return await this.instance(config);
      } catch (error) {
         const httpError = error as AxiosError;

         if (httpError?.response?.status === 401 || httpError?.response?.status === 403) {
            clearCurrentUserData();
            return;
         }

         throw error;
      } finally {
         --this.currentApiQueue;

         if (this.currentApiQueue <= 0) {
            loaderService.hideLoader();
         }
      }
   }
}

const interceptorService = new InterceptorService();

export default interceptorService;
