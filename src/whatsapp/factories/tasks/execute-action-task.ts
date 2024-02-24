import { ExecuteActionJob } from '@/whatsapp/jobs/tasks';
import { HttpExecuteAction } from '@/whatsapp/usecases';

export const executeActionTask = () => {
  const dbExecuteAction = new HttpExecuteAction();

  return new ExecuteActionJob(dbExecuteAction);
};
