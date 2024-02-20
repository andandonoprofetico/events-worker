import { SessionRepository } from '@/infra/db/mysql';
import { ListSessionJob } from '@/whatsapp/jobs/tasks';
import { DbListSession } from '@/whatsapp/usecases';

export const listSessionTask = () => {
  const sessionRepository = new SessionRepository();

  const dbListSession = new DbListSession(sessionRepository);

  return new ListSessionJob(dbListSession);
};
