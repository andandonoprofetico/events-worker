import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { ListUserTokenHttp } from './contracts/list-token-user';

export class ListUserTokenService implements ListUserTokenHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async auth(params: ListUserTokenHttp.Params): ListUserTokenHttp.Result {
    const url = '/v1/authentications/user';
    const method = 'POST';
    const body = params;

    const response = await this.httpClient.request({
      url,
      body,
      method,
    });

    logger.log({
      level: 'info',
      message: 'get token in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return null;
    }

    return {
      token: response.body.payload.access_token,
    };
  }
}
