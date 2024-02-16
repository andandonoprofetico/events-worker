import { logger } from '@/utils';
import { AxiosInstance } from 'axios';

export class RequestAdapter implements HttpClient {
  constructor(private readonly axios: AxiosInstance) {
    this.axios.interceptors.response.use(undefined, (error) => {
      logger.log(error);

      if (!error.response) {
        throw new Error('REQUEST_ERROR');
      }

      return error.response;
    });
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    const axiosResponse = await this.axios({
      data: data?.body,
      ...data,
    });

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
      headers: axiosResponse.headers,
    };
  }
}
