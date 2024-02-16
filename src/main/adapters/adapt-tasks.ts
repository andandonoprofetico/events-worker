import { generateUuid } from '@/utils';
import makeFlow from '@/utils/flow-adapter';

const STATE_KEY = Symbol('STATE');

type Tasks =
  | Function[]
  | { handle: (message: any, state: any, next: Next) => void }[];
type Next = () => {};

export const taskAdapter = (...tasks: Tasks) => {
  type State = Record<string, unknown>;
  const traceId = generateUuid();

  const adaptedTasks = tasks.map((task) => {
    return (
      { [STATE_KEY]: state, ...payload }: { [key: string | symbol]: State },
      next: Next,
    ) => {
      const setState = (data: State) => {
        for (const key in data) {
          if (typeof key === 'string' || typeof key === 'number')
            state[key] = data[key];
        }
      };

      const stateHook = <[any, any]>[state, setState];

      if (typeof task === 'function') return task(payload, stateHook, next);

      return task.handle(payload, stateHook, next);
    };
  });

  return (payload: any) => {
    return makeFlow({ ...payload, [STATE_KEY]: { traceId } })(
      ...adaptedTasks,
    )();
  };
};
