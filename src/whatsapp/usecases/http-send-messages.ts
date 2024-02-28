import { SendMessageHttp } from '@/infra/http/zenvia/contracts';
import { logger } from '@/utils';

import { SendMessages } from '../domain/usecases';
import { whatsAppMessageFormatter } from '../utils';

export class HttpSendMessages implements SendMessages {
  constructor(private readonly sendMessageHttp: SendMessageHttp) {}

  async send(params: SendMessages.Params): SendMessages.Result {
    const { actions, messages, session } = params;

    const allMessages = actions.concat(
      messages.map((message) => ({
        type: message.type,
        additionalFields: message.additionalFields,
        body: message.body,
        button: message.button,
        fileMimeType: message.fileMimeType,
        fileName: message.fileName,
        fileUrl: message.fileUrl,
        footer: message.footer,
        header: message.header,
      })),
    );

    try {
      const formatMessage = whatsAppMessageFormatter({
        messages: allMessages,
        session,
      });

      await this.sendMessageHttp.post(formatMessage);
    } catch (error) {
      logger.log({
        traceId: params.traceId,
        level: 'error',
        message: 'An error ocurred in send message to zenvia',
        payload: allMessages,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
  }
}
