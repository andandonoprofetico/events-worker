import { logger } from '@/utils';
import { ListSteps } from '@/whatsapp/domain/usecases';

import { Task } from '../protocols';

export class ListStepsJob implements Task {
  constructor(private readonly listSteps: ListSteps) {}

  async handle(
    message: Task.Message,
    [state, setState]: Task.State,
    next: Function,
  ): Task.Result {
    try {
      if (!state.session) {
        throw new Error('JOB_NOT_HAVE_REQUIRED_PARAMS');
      }

      const steps = await this.listSteps.list({
        payload: message,
        session: state.session,
      });

      setState({
        steps,
      });

      next();
    } catch (error) {
      logger.log({
        traceId: state.traceId,
        level: 'error',
        message: 'An error ocurred in list steps job',
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
