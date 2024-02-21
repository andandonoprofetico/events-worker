import { convertSnakeCaseKeysToCamelCase } from '@/utils';

import { IStepRepository } from '../protocols';
import { knexConnection } from './helper';

export class StepRepository implements IStepRepository {
  async listByStep(name: string): IStepRepository.ListByStepResult {
    const step = await knexConnection('tb_whatsapp_steps')
      .select('*')
      .where('step', name)
      .first();

    return convertSnakeCaseKeysToCamelCase(step);
  }

  async listById(id: number): IStepRepository.ListByIdResult {
    const step = await knexConnection('tb_whatsapp_steps')
      .select('*')
      .where('step_id', id)
      .first();

    return convertSnakeCaseKeysToCamelCase(step);
  }

  async listByExternalId(id: string): IStepRepository.ListByExternalIdResult {
    const step = await knexConnection('tb_whatsapp_steps')
      .select('*')
      .where('external_id', id)
      .first();

    return convertSnakeCaseKeysToCamelCase(step);
  }
}
