import { IDialogueRepository, IStepRepository } from '@/infra/db/protocols';
import { logger } from '@/utils';
import { addInDate, isBeforeDate } from '@/utils/date';

import { ListSteps } from '../domain/usecases';

export class DbListSteps implements ListSteps {
  constructor(
    private readonly dialogueRepository: IDialogueRepository,
    private readonly stepRepository: IStepRepository,
  ) {}

  private async listInitialStep(type: 'text' | 'file'): ListSteps.Result {
    const isFile = type === 'file';

    const nextStep = await this.stepRepository.listByStep(
      isFile ? 'file-other-number' : 'welcome',
    );

    return {
      actual: null,
      next: nextStep,
    };
  }

  async list(params: ListSteps.Params): ListSteps.Result {
    const { payload, session } = params;

    const typeMessage = payload.message.contents[0].type;

    const dialogue = await this.dialogueRepository.listBySessionAndStatus({
      sessionId: session.sessionId,
      status: 'awaiting_response',
    });

    if (!dialogue) {
      return this.listInitialStep(typeMessage);
    }

    const expiration = addInDate(new Date(dialogue.createdAt), {
      minutes: 30,
    });

    if (isBeforeDate(new Date(), expiration)) {
      await this.dialogueRepository.update(
        {
          updatedAt: new Date(),
          status: 'expired',
        },
        {
          dialoguesId: dialogue.dialoguesId,
        },
      );

      return this.listInitialStep(typeMessage);
    }

    const currentStep = await this.stepRepository.listById(dialogue.stepId);

    logger.log({
      level: 'info',
      message: 'Step current',
      step: currentStep,
    });

    if (
      typeMessage === 'text' &&
      payload.message.contents[0].payload &&
      currentStep.redirect === 'multiple-response'
    ) {
      const nextStepId = payload.message.contents[0].payload;

      const nextStep = await this.stepRepository.listByExternalId(nextStepId);

      return {
        actual: currentStep,
        next: nextStep,
      };
    }

    const nextStep = await this.stepRepository.listByExternalId(
      currentStep.redirect,
    );

    return {
      actual: currentStep,
      next: nextStep,
    };
  }
}
