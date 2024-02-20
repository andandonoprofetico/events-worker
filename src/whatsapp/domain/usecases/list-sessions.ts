import { Payload } from '../dto';
import { Session } from '../entities';

export interface ListSession {
  list(params: ListSession.Params): ListSession.Result;
}

export namespace ListSession {
  export type Params = Payload;

  export type Result = Promise<Session>;
}
