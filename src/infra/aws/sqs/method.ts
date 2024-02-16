import { AWS, logger } from '@/utils';
import { isJson } from '@/utils/text';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';

import { CreateConsume } from '../protocols';

export class Sqs implements CreateConsume {
  public sqs!: SQSClient;

  constructor() {
    this.sqs = new SQSClient({
      credentials: {
        accessKeyId: AWS.ACCESS_KEY_ID,
        secretAccessKey: AWS.SECRET_ACCESS_KEY,
      },
      region: AWS.DEFAULT_REGION,
    });
  }

  consume(url: string, options: CreateConsume.Params): CreateConsume.Result {
    const app = Consumer.create({
      queueUrl: url,
      handleMessage: async (message) => {
        if (!message.Body) {
          return;
        }

        const json = isJson(message?.Body);

        if (!json.is) {
          return;
        }

        await options.handler(json.payload);
      },
      sqs: this.sqs,
    });

    app.on('error', (err) => {
      logger.log({
        level: 'error',
        message: 'Error on sqs',
        error: {
          message: err.message,
          stack: err.stack,
        },
      });
    });

    app.on('processing_error', (err) => {
      logger.log({
        level: 'error',
        message: 'Error on process message',
        error: {
          message: err.message,
          stack: err.stack,
        },
      });
    });

    return app;
  }
}
