export interface SendFormHttp {
  post(params: SendFormHttp.Params): SendFormHttp.Result;
}

export namespace SendFormHttp {
  export type Params = {
    form: string;
    body: any;
    token: string;
  };

  export type Result = Promise<{
    id: string;
  } | null>;
}
