import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { ListEventByIdHttp } from './contracts';

export class ListEventByIdService implements ListEventByIdHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params: ListEventByIdHttp.Params): ListEventByIdHttp.Result {
    const url = `/v1/courses/${params.id}`;
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
      message: 'get event in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return null;
    }

    return response.body.payload;
  }
}
