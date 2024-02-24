import { Action } from '../domain/dto';

export type Actions = {
  name: string;
  handle: Action;
}[];

export const actions: Actions = [] as const;
