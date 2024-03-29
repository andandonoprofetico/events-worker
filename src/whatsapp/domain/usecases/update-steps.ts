import { Message, Session, Step } from '@/application/domain';

import { ActionResult, Payload } from '../dto';

export interface UpdateSteps {
  update(params: UpdateSteps.Params): UpdateSteps.Result;
}

export namespace UpdateSteps {
  export type Params = {
    payload: Payload;
    session: Session;
    step: {
      actual: Step | null;
      next: Step | null;
    };
    actions: ActionResult;
  };

  export type Result = Promise<Message[]>;
}
