export interface SendMessageHttp {
  post(params: SendMessageHttp.Params): SendMessageHttp.Result;
}

export namespace SendMessageHttp {
  export type Params = {
    token: string;
    type: 'DREAMS' | 'PRAYERS' | 'TESTIMONIALS';
    text: string;
  };

  export type Result = Promise<{
    id: string;
  } | null>;
}
