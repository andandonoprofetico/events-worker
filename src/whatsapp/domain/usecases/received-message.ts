export interface ReceivedMessage {
  verify(params: ReceivedMessage.Params): ReceivedMessage.Result;
}

export namespace ReceivedMessage {
  export type Params = {};

  export type Result = Promise<{}>;
}
