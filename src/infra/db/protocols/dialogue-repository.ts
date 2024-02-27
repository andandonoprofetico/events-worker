import { Dialogue } from '@/whatsapp/domain/entities';

export interface IDialogueRepository {
  create: (
    params: IDialogueRepository.CreateParams,
  ) => IDialogueRepository.CreateResult;
  listBySessionAndStatus: (
    params: IDialogueRepository.ListBySessionAndStatusParams,
  ) => IDialogueRepository.ListBySessionAndStatusResult;
  update: (
    params: IDialogueRepository.UpdateParam,
    where: IDialogueRepository.UpdateWhere,
  ) => IDialogueRepository.UpdateResult;
}

export namespace IDialogueRepository {
  export type CreateParams = Omit<Dialogue, 'dialoguesId'>;

  export type CreateResult = Promise<number[]>;

  export type ListBySessionAndStatusParams = {
    sessionId: number;
    status: Dialogue['status'];
  };

  export type ListBySessionAndStatusResult = Promise<Dialogue | null>;

  export type UpdateParam = Partial<Omit<Dialogue, 'dialoguesId'>>;

  export type UpdateWhere = Partial<Dialogue>;

  export type UpdateResult = Promise<number>;
}
