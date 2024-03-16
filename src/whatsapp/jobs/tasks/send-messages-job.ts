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
      if (!state.session) {
        throw new Error('JOB_NOT_HAVE_REQUIRED_PARAMS');
      }

      const actions = state.actions || { continue: true, actions: [] };

      await this.sendMessages.send({
        traceId: state.traceId || 'NOT_CREATED',
        actions: state.actions ? state.actions : actions,
        messages: state.messages?.length ? state.messages : [],
        session: state.session,
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
