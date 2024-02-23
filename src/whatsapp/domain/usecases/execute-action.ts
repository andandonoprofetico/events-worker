import { Action, Payload } from '../dto';
import { Session, Step } from '../entities';

export interface ExecuteAction {
  execute(params: ExecuteAction.Params): ExecuteAction.Result;
}

export namespace ExecuteAction {
  export type Params = {
    session: Session;
    payload: Payload;
    step: Step;
  };

  export type Result = Promise<Action[]>;
}
