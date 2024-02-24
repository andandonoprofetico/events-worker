import { actions } from '../actions';
import { ExecuteAction } from '../domain/usecases';

export class HttpExecuteAction implements ExecuteAction {
  constructor() {}

  async execute(params: ExecuteAction.Params): ExecuteAction.Result {
    const actionName = params.step.action;

    if (!actionName) {
      return {
        actions: [],
      };
    }

    const action = actions.find((action) => action.name === actionName);

    if (!action) {
      return {
        actions: [],
      };
    }

    const resultActions = await action.handle(params);

    return {
      actions: resultActions,
    };
  }
}
