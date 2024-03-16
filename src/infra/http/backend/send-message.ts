import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { SendMessageHttp } from './contracts';

export class SendMessageService implements SendMessageHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async post(params: SendMessageHttp.Params): SendMessageHttp.Result {
    const url = '/v1/messages';
    const method = 'POST';

    const response = await this.httpClient.request({
      url,
      method,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
      body: {
        type: params.type,
        text: params.text,
      },
    });

    logger.log({
      level: 'info',
      message: 'send message in backend api',
      payload: response,
    });

    if (response.statusCode !== 201) {
      return null;
    }

    return response.body.payload;
  }
}
