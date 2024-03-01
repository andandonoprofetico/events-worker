export interface ListBookByIdHttp {
  list(params: ListBookByIdHttp.Params): ListBookByIdHttp.Result;
}

export namespace ListBookByIdHttp {
  export type Params = {
    token: string;
    id: string;
  };

  export type Result = Promise<{
    product: {
      external_id: string;
      name: string;
      description: string;
      enabled: boolean;
      link: string;
      value: string;
      created_at: string;
      updated_at: string;
    };
    type: {
      external_id: string;
      type: string;
    };
    image: {
      external_id: string;
      main: boolean;
      url: string;
    };
  } | null>;
}
