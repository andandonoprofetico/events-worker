import { logger } from '@/utils';
import { SendMessages } from '@/whatsapp/domain/usecases';

import { Task } from '../protocols';

export class SendMessagesJob implements Task {
  constructor(private readonly sendMessages: SendMessages) {}

  async handle(
    message: Task.Message,
    [state]: Task.State,
    next: Function,
  ): Task.Result {
    try {
      await this.sendMessages.send({
        traceId: state.traceId || 'NOT_CREATED',
        actions: state.actions?.length ? state.actions : [],
        messages: state.messages?.length ? state.messages : [],
      });

      next();
    } catch (error) {
      logger.log({
        traceId: state.traceId,
        level: 'error',
        message: 'An error ocurred in send messages job',
        payload: message,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });

      throw error;
    }
  }
}
