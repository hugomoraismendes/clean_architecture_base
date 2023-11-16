import { IRequestService } from '@adapters';
import { Errors } from '@shared';

export default class HttpRequestService implements IRequestService {
  constructor() {}

  public async request(path: string, data?: any, method?: any): Promise<any> {
    try {
      const requestOptions = {
        url: path,
        method: method || 'GET',
        data,
        timeout: 300
      };
      console.info('Requesting', {
        url: requestOptions.url,
        method: requestOptions.method,
        data: JSON.stringify(requestOptions.data)
      });

      const response = await fetch(path, requestOptions);

      if (response.status === 200) {
        console.info('Response', { status: response.status });
        return response.status;
      }

      throw new Errors.Api.ApiError('');
    } catch (err: any) {
      if (err.response) {
        console.error('Request error', {
          data: err.response.data,
          status: err.response.status
        });
      }

      throw err;
    }
  }
}
