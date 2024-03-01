import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { ListBooksHttp } from './contracts';

export class ListBooksService implements ListBooksHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params: ListBooksHttp.Params): ListBooksHttp.Result {
    const url = '/v1/products';
    const queryParams = `status=active&limit=${params.limit}&page=${params.page}`;
    const method = 'GET';

    const response = await this.httpClient.request({
      url: `${url}?${queryParams}`,
      method,
    });

    logger.log({
      level: 'info',
      message: 'get token in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return [];
    }

    return response.body.payload.data;
  }
}
