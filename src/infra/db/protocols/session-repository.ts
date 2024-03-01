import { Session } from '@/application/domain';

export interface ISessionRepository {
  listByPhone: (
    params: ISessionRepository.ListByPhoneParams,
  ) => ISessionRepository.ListByPhoneResult;
  create: (
    params: ISessionRepository.CreateParams,
  ) => ISessionRepository.CreateResult;
  delete: (id: number) => ISessionRepository.DeleteResult;
  update: (
    params: ISessionRepository.UpdateParams,
    where: ISessionRepository.UpdateWhere,
  ) => ISessionRepository.UpdateResult;
}

export namespace ISessionRepository {
  export type ListByPhoneParams = {
    phone: string;
    type: 'IN' | 'OUT';
  };

  export type ListByPhoneResult = Promise<Session | null>;

  export type CreateParams = Omit<Session, 'sessionId'>;

  export type CreateResult = Promise<number[]>;

  export type DeleteResult = Promise<number>;

  export type UpdateParams = Partial<Omit<Session, 'sessionId'>>;

  export type UpdateWhere = Partial<Session>;

  export type UpdateResult = Promise<number>;
}
