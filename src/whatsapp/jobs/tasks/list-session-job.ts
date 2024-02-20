import { logger } from '@/utils';
import { ListSession } from '@/whatsapp/domain/usecases';

import { Task } from '../protocols';

export class ListSessionJob implements Task {
  constructor(private readonly listSession: ListSession) {}

  async handle(
    message: Task.Message,
    [state, setState]: Task.State,
    next: Function,
  ): Task.Result {
    try {
      const session = await this.listSession.list(message);

      setState({
        session,
      });

      next();
    } catch (error) {
      logger.log({
        traceId: state.traceId,
        level: 'error',
        message: 'An error ocurred in list session job',
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
