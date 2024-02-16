import { SharedState } from './shared-state';

export interface Task {
  handle(message: any, state: Task.State, next: Task.Next): Task.Result;
}

export namespace Task {
  type setState = (state: SharedState) => void;
  export type State = [SharedState, setState];
  export type Next = Function;
  export type Result = Promise<void>;
}
