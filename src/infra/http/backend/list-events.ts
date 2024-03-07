import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { ListEventsHttp } from './contracts';

export class ListEventsService implements ListEventsHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async list(params: ListEventsHttp.Params): ListEventsHttp.Result {
    const url = '/v1/courses';
    const queryParams = `status=active&limit=${params.limit}&page=${params.page}`;
    const method = 'GET';

    const response = await this.httpClient.request({
      url: `${url}?${queryParams}`,
      method,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    logger.log({
      level: 'info',
      message: 'get all events in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return [];
    }

    return response.body.payload.data;
  }
}
