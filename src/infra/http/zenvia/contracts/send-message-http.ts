export interface SendMessageHttp {
  post(params: SendMessageHttp.Params): SendMessageHttp.Result;
}

export namespace SendMessageHttp {
  export type Params = any;

  export type Result = Promise<void>;
}
