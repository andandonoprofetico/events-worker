import { ISessionRepository } from '@/infra/db/protocols';
import { addInDate, isBeforeDate } from '@/utils/date';

import { ListSession } from '../domain/usecases/list-sessions';

export class DbListSession implements ListSession {
  constructor(private readonly sessionRepository: ISessionRepository) {}

  async list(params: ListSession.Params): ListSession.Result {
    const session = await this.sessionRepository.listByPhone({
      phone: params.message.from,
      type: params.direction,
    });

    if (session) {
      const expiration = addInDate(new Date(session.updatedAt), {
        hours: 24,
      });

      if (isBeforeDate(new Date(), expiration)) {
        return session;
      }

      await this.sessionRepository.delete(session.sessionId);
    }

    const newSession = {
      phone: params.message.from,
      type: params.direction,
      payload: { user: params.message.visitor.name },
      companyId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [sessionId] = await this.sessionRepository.create(newSession);

    return {
      sessionId,
      ...newSession,
    };
  }
}
