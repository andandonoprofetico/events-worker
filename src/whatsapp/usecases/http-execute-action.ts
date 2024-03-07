import { logger } from '@/utils';

import { actions } from '../actions';
import { ExecuteAction } from '../domain/usecases';

export class HttpExecuteAction implements ExecuteAction {
  constructor() {}

  async execute(params: ExecuteAction.Params): ExecuteAction.Result {
    const actionName = params.step.action;

    if (!actionName) {
      return {
        actions: [],
        continue: true,
      };
    }

    const action = actions.find((action) => action.name === actionName);

    if (!action) {
      logger.log({
        level: 'error',
        message: 'Action not found in list',
        payload: {
          action: actionName,
        },
      });

      return {
        actions: [],
        continue: true,
      };
    }

    const resultActions = await action.handle(params);

    return resultActions;
  }
}
