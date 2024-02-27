import { logger } from '@/utils';
import { ZENVIA } from '@/whatsapp/utils';

import { HttpClient } from '../protocols';
import { SendMessageHttp } from './contracts';

export class SendMessageService implements SendMessageHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async post(params: SendMessageHttp.Params): SendMessageHttp.Result {
    const url = '/v2/channels/whatsapp/messages';
    const method = 'POST';
    const body = params;

    const response = await this.httpClient.request({
      url,
      body,
      method,
      headers: {
        'X-API-TOKEN': ZENVIA.API_KEY,
      },
    });

    logger.log({
      level: 'info',
      status: response.statusCode,
      message: 'send message to zenvia api',
      payload: response,
    });
  }
}
