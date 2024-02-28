import { Message, Session } from '@/application/domain';

import { ActionResult } from '../dto';

export interface SendMessages {
  send(params: SendMessages.Params): SendMessages.Result;
}

export namespace SendMessages {
  export type Params = {
    traceId: string;
    actions: ActionResult;
    messages: Message[];
    session: Session;
  };

  export type Result = Promise<void>;
}
