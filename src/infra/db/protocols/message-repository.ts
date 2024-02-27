import { Message } from '@/whatsapp/domain/entities';

export interface IMessageRepository {
  listByStep: (step: number) => IMessageRepository.ListByStepResult;
}

export namespace IMessageRepository {
  export type ListByStepResult = Promise<Message[]>;
}
