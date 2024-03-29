import {
  IDialogueRepository,
  IMessageRepository,
  IStepRepository,
} from '@/infra/db/protocols';
import { logger } from '@/utils';

import { UpdateSteps } from '../domain/usecases';
import { WHATSAPP, getResponseMessage } from '../utils';

export class DbUpdateSteps implements UpdateSteps {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly dialogueRepository: IDialogueRepository,
    private readonly stepRepository: IStepRepository,
  ) {}

  async update(params: UpdateSteps.Params): UpdateSteps.Result {
    const { payload, session, step, actions } = params;

    if (!step.next) {
      logger.log({
        level: 'warn',
        message: 'Step not found by message',
        payload,
      });

      const messages = await this.messageRepository.listByStep(
        WHATSAPP.STEP_NOT_FOUND,
      );

      return messages;
    }

    if (!actions.continue) {
      logger.log({
        level: 'warn',
        message: 'Action not permitted to continue',
        payload,
        actions,
        step,
      });

      const errorStep = await this.stepRepository.listByExternalId(
        step.next.error || '',
      );

      const messages = await this.messageRepository.listByStep(
        errorStep.stepId || 1,
      );

      return messages;
    }

    const messages = await this.messageRepository.listByStep(step.next.stepId);

    if (step.actual) {
      await this.dialogueRepository.update(
        {
          received: getResponseMessage(payload),
          status: 'completed',
          updatedAt: new Date(),
        },
        {
          sessionId: session.sessionId,
          stepId: step.actual.stepId,
        },
      );
    }

    await this.dialogueRepository.create({
      sessionId: session.sessionId,
      status: step.next.redirect === 'end' ? 'completed' : 'awaiting_response',
      stepId: step.next.stepId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return messages;
  }
}
