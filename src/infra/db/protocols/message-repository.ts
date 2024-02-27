import { Message } from '@/application/domain';

export interface IMessageRepository {
  listByStep: (step: number) => IMessageRepository.ListByStepResult;
}

export namespace IMessageRepository {
  export type ListByStepResult = Promise<Message[]>;
}
