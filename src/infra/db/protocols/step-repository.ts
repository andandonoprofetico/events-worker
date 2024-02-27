import { Step } from '@/application/domain';

export interface IStepRepository {
  listByStep: (name: string) => IStepRepository.ListByStepResult;
  listById: (id: number) => IStepRepository.ListByIdResult;
  listByExternalId: (id: string) => IStepRepository.ListByExternalIdResult;
}

export namespace IStepRepository {
  export type ListByStepResult = Promise<Step>;
  export type ListByIdResult = Promise<Step>;
  export type ListByExternalIdResult = Promise<Step>;
}
