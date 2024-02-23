import { ExecuteAction } from '../domain/usecases';

export class HttpExecuteAction implements ExecuteAction {
  async execute(params: ExecuteAction.Params): ExecuteAction.Result {
    throw new Error('Method not implemented.');
  }
}
