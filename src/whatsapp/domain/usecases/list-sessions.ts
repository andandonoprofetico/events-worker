import { Session } from '@/application/domain';

import { Payload } from '../dto';

export interface ListSession {
  list(params: ListSession.Params): ListSession.Result;
}

export namespace ListSession {
  export type Params = Payload;

  export type Result = Promise<Session>;
}
