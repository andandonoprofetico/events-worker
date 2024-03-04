import { logger } from '@/utils';

import { HttpClient } from '../protocols';
import { SendFormHttp } from './contracts';

export class SendFormService implements SendFormHttp {
  constructor(private readonly httpClient: HttpClient) {}

  async post(params: SendFormHttp.Params): SendFormHttp.Result {
    const url = `/v1/forms/${params.form}`;
    const method = 'POST';

    const response = await this.httpClient.request({
      url,
      method,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
      body: params.body,
    });

    logger.log({
      level: 'info',
      message: 'send form in backend api',
      payload: response,
    });

    if (response.statusCode !== 200) {
      return null;
    }

    return response.body.payload;
  }
}
