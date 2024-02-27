import { makeBackendFacade } from '@/application/facades';

export const makeOnInit = async () => {
  const backend = makeBackendFacade();

  await Promise.allSettled([backend.init()]);
};
