import { SharedState } from './shared-state';

export interface Task {
  handle(
    message: Task.Message,
    state: Task.State,
    next: Task.Next,
  ): Task.Result;
}

export namespace Task {
  type setState = (state: SharedState) => void;
  export type Message = any;
  export type State = [SharedState, setState];
  export type Next = () => void;
  export type Result = Promise<void>;
}
