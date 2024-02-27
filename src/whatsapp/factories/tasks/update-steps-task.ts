import { MessageRepository, DialogueRepository } from '@/infra/db/mysql';
import { UpdateStepsJob } from '@/whatsapp/jobs/tasks';
import { DbUpdateSteps } from '@/whatsapp/usecases';

export const updateStepsTask = () => {
  const dialogueRepository = new DialogueRepository();
  const messageRepository = new MessageRepository();

  const dbUpdateSteps = new DbUpdateSteps(
    messageRepository,
    dialogueRepository,
  );

  return new UpdateStepsJob(dbUpdateSteps);
};
