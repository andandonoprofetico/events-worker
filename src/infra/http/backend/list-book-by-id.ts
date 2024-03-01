import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { ListBookByIdHttp } from './contracts';

export class ListBookByIdService implements ListBookByIdHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params: ListBookByIdHttp.Params): ListBookByIdHttp.Result {
    const url = `/v1/products/${params.id}`;
    const method = 'GET';

    const response = await this.httpClient.request({
      url,
      method,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    logger.log({
      level: 'info',
      message: 'get book in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return null;
    }

    return response.body.payload;
  }
}
