import { logger } from '@/utils';
import { UpdateSteps } from '@/whatsapp/domain/usecases';

import { Task } from '../protocols';

export class UpdateStepsJob implements Task {
  constructor(private readonly updateSteps: UpdateSteps) {}

  async handle(
    message: Task.Message,
    [state, setState]: Task.State,
    next: Function,
  ): Task.Result {
    try {
      if (!state.session) {
        throw new Error('JOB_NOT_HAVE_REQUIRED_PARAMS');
      }

      if (!state.steps) {
        throw new Error('JOB_NOT_HAVE_REQUIRED_PARAMS');
      }

      const messages = await this.updateSteps.update({
        payload: message,
        step: state.steps,
        session: state.session,
      });

      setState({
        messages,
      });

      next();
    } catch (error) {
      logger.log({
        traceId: state.traceId,
        level: 'error',
        message: 'An error ocurred in update steps job',
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
