import {
  convertCamelCaseKeysToSnakeCase,
  convertSnakeCaseKeysToCamelCase,
} from '@/utils';

import { ISessionRepository } from '../protocols';
import { knexConnection } from './helper';

export class SessionRepository implements ISessionRepository {
  delete(id: number): ISessionRepository.DeleteResult {
    return knexConnection('tb_whatsapp_sessions')
      .update({
        deleted_at: new Date(),
        updated_at: new Date(),
      })
      .where('session_id', id);
  }

  async listByPhone(
    params: ISessionRepository.ListByPhoneParams,
  ): ISessionRepository.ListByPhoneResult {
    const session = await knexConnection('tb_whatsapp_sessions')
      .select('*')
      .where('phone', params.phone)
      .andWhere('type', params.type)
      .whereNull('deleted_at')
      .first();

    return convertSnakeCaseKeysToCamelCase(session);
  }

  create(
    params: ISessionRepository.CreateParams,
  ): ISessionRepository.CreateResult {
    return knexConnection('tb_whatsapp_sessions').insert(
      convertCamelCaseKeysToSnakeCase(params),
    );
  }
}
