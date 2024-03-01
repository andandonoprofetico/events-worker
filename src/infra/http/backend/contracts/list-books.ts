export interface ListBooksHttp {
  list(params: ListBooksHttp.Params): ListBooksHttp.Result;
}

export namespace ListBooksHttp {
  export type Params = {
    token: string;
    page: number;
    limit: number;
  };

  export type Result = Promise<
    {
      products: {
        external_id: string;
        name: string;
        description: string;
        value: string;
        link: string;
      };
      image: {
        external_id: string;
        url: string;
      };
    }[]
  >;
}
