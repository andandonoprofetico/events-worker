export const actions = [
  {
    name: 'type',
    handle: () => {},
  },
] as const;

export type Actions = typeof actions;
