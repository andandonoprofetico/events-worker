import { convertSnakeCaseKeysToCamelCase } from '@/utils';

import { IMessageRepository } from '../protocols';
import { knexConnection } from './helper';

export class MessageRepository implements IMessageRepository {
  async listByStep(step: number): IMessageRepository.ListByStepResult {
    const steps = await knexConnection('tb_whatsapp_messages')
      .select('*')
      .where('step_id', step)
      .orderBy('order', 'asc');

    return convertSnakeCaseKeysToCamelCase(steps);
  }
}
