import { Consumer } from 'sqs-consumer';

export interface CreateConsume {
  consume(url: string, options: CreateConsume.Params): CreateConsume.Result;
}

export namespace CreateConsume {
  export type Params = {
    handler: (message: any) => Promise<void>;
  };

  export type Result = Consumer;
}
