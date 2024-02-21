import { StepRepository, DialogueRepository } from '@/infra/db/mysql';
import { ListStepsJob } from '@/whatsapp/jobs/tasks';
import { DbListSteps } from '@/whatsapp/usecases';

export const listStepsTask = () => {
  const dialogueRepository = new DialogueRepository();
  const stepRepository = new StepRepository();

  const dbListSteps = new DbListSteps(dialogueRepository, stepRepository);

  return new ListStepsJob(dbListSteps);
};
