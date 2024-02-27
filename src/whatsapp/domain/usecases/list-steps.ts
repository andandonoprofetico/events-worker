import { Session, Step } from '@/application/domain';

import { Payload } from '../dto';

export interface ListSteps {
  list(params: ListSteps.Params): ListSteps.Result;
}

export namespace ListSteps {
  export type Params = {
    payload: Payload;
    session: Session;
  };

  export type Result = Promise<{
    actual: Step | null;
    next: Step;
  }>;
}
