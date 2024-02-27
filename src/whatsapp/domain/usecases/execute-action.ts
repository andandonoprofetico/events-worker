import { Session, Step } from '@/application/domain';

import { ActionResult, Payload } from '../dto';

export interface ExecuteAction {
  execute(params: ExecuteAction.Params): ExecuteAction.Result;
}

export namespace ExecuteAction {
  export type Params = {
    session: Session;
    payload: Payload;
    step: Step;
  };

  export type Result = Promise<{
    actions: ActionResult;
  }>;
}
