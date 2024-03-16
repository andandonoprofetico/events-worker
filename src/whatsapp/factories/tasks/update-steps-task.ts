import {
  MessageRepository,
  DialogueRepository,
  StepRepository,
} from '@/infra/db/mysql';
import { UpdateStepsJob } from '@/whatsapp/jobs/tasks';
import { DbUpdateSteps } from '@/whatsapp/usecases';

export const updateStepsTask = () => {
  const dialogueRepository = new DialogueRepository();
  const messageRepository = new MessageRepository();
  const stepRepository = new StepRepository();

  const dbUpdateSteps = new DbUpdateSteps(
    messageRepository,
    dialogueRepository,
    stepRepository,
  );

  return new UpdateStepsJob(dbUpdateSteps);
};
