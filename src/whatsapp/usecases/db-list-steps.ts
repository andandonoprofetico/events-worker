import { IDialogueRepository, IStepRepository } from '@/infra/db/protocols';

import { ListSteps } from '../domain/usecases';

export class DbListSteps implements ListSteps {
  constructor(
    private readonly dialogueRepository: IDialogueRepository,
    private readonly stepRepository: IStepRepository,
  ) {}

  async list(params: ListSteps.Params): ListSteps.Result {
    const { payload, session } = params;

    const typeMessage = payload.message.contents[0].type;

    const dialogue = await this.dialogueRepository.listBySessionAndStatus({
      sessionId: session.sessionId,
      status: 'awaiting_response',
    });

    if (!dialogue) {
      const isFile = typeMessage === 'file';

      const nextStep = await this.stepRepository.listByStep(
        isFile ? 'file-other-number' : 'welcome',
      );

      return {
        actual: null,
        next: nextStep,
      };
    }

    const currentStep = await this.stepRepository.listById(dialogue.stepId);

    if (
      (typeMessage === 'list' || typeMessage === 'button') &&
      currentStep.redirect === 'multiple-response'
    ) {
      const nextStepId = payload.message.contents[0].id;

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
