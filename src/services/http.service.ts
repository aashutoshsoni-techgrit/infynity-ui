import interceptorService from './interceptor.service';

class HttpService {
   get(url: string, customHeaders = {}) {
      return interceptorService.request('get', url, null, customHeaders);
   }

   post(url: string, data: unknown, customHeaders = {}) {
      return interceptorService.request('post', url, data, customHeaders);
   }

   put(url: string, data: unknown, customHeaders = {}) {
      return interceptorService.request('put', url, data, customHeaders);
   }

   delete(url: string, customHeaders = {}) {
      return interceptorService.request('delete', url, null, customHeaders);
   }

   patch(url: string, data: unknown, customHeaders = {}) {
      return interceptorService.request('patch', url, data, customHeaders);
   }
}

const httpService = new HttpService();

export default httpService;
