import { ListSteps } from '../domain/usecases';

export class DbListSteps implements ListSteps {
  constructor() {}

  list(params: ListSteps.Params): ListSteps.Result {
    throw new Error('Method not implemented.');
  }
}
