import { Dialogue } from '@/whatsapp/domain/entities';

export interface IDialogueRepository {
  create: (
    params: IDialogueRepository.CreateParams,
  ) => IDialogueRepository.CreateResult;
  listBySessionAndStatus: (
    params: IDialogueRepository.ListBySessionAndStatusParams,
  ) => IDialogueRepository.ListBySessionAndStatusResult;
}

export namespace IDialogueRepository {
  export type CreateParams = Pick<Dialogue, 'dialoguesId'>;

  export type CreateResult = Promise<number[]>;

  export type ListBySessionAndStatusParams = {
    sessionId: number;
    status: Dialogue['status'];
  };

  export type ListBySessionAndStatusResult = Promise<Dialogue | null>;
}
