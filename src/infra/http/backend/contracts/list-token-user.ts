export interface ListUserTokenHttp {
  auth(params: ListUserTokenHttp.Params): ListUserTokenHttp.Result;
}

export namespace ListUserTokenHttp {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = Promise<{
    token: string;
  } | null>;
}
