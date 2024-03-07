export interface ListEventByIdHttp {
  list(params: ListEventByIdHttp.Params): ListEventByIdHttp.Result;
}

export namespace ListEventByIdHttp {
  export type Params = {
    token: string;
    id: string;
  };

  export type Result = Promise<{
    course: {
      external_id: string;
      title: string;
      name: string;
      description: string;
      active: boolean;
      link: string;
      video: string;
      local: string;
      date: string;
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
