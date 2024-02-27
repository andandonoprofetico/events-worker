import { IDialogueRepository, IMessageRepository } from '@/infra/db/protocols';

import { UpdateSteps } from '../domain/usecases';
import { WHATSAPP, getResponseMessage } from '../utils';

export class DbUpdateSteps implements UpdateSteps {
  constructor(
    private readonly messageRepository: IMessageRepository,
    private readonly dialogueRepository: IDialogueRepository,
  ) {}

  async update(params: UpdateSteps.Params): UpdateSteps.Result {
    const { payload, session, step } = params;

    if (!step.next) {
      const messages = await this.messageRepository.listByStep(
        WHATSAPP.STEP_NOT_FOUND,
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
