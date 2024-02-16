export type Options = {
  enabled: boolean;
  queue: string;
  handler: (object: object) => Promise<void>;
};
