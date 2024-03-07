export interface ListEventsHttp {
  list(params: ListEventsHttp.Params): ListEventsHttp.Result;
}

export namespace ListEventsHttp {
  export type Params = {
    token: string;
    page: number;
    limit: number;
  };

  export type Result = Promise<
    {
      course: {
        external_id: string;
        name: string;
        title: string;
      };
      image: {
        external_id: string;
        url: string;
      };
    }[]
  >;
}
