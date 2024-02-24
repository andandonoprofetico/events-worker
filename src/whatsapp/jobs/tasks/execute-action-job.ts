import { logger } from '@/utils';
import { ExecuteAction } from '@/whatsapp/domain/usecases';

import { Task } from '../protocols';

export class ExecuteActionJob implements Task {
  constructor(private readonly executeAction: ExecuteAction) {}

  async handle(
    message: Task.Message,
    [state, setState]: Task.State,
    next: Function,
  ): Task.Result {
    try {
      if (!state.session) {
        throw new Error('JOB_NOT_HAVE_REQUIRED_PARAMS');
      }

      if (!state.steps?.next) {
        return;
      }

      const result = await this.executeAction.execute({
        payload: message,
        step: state.steps?.next,
        session: state.session,
      });

      setState({
        actions: result.actions,
      });

      next();
    } catch (error) {
      logger.log({
        traceId: state.traceId,
        level: 'error',
        message: 'An error ocurred in execute action job',
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
