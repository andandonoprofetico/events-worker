import {
  convertCamelCaseKeysToSnakeCase,
  convertSnakeCaseKeysToCamelCase,
} from '@/utils';

import { IDialogueRepository } from '../protocols';
import { knexConnection } from './helper';

export class DialogueRepository implements IDialogueRepository {
  update(
    params: IDialogueRepository.UpdateParam,
    where: IDialogueRepository.UpdateWhere,
  ): IDialogueRepository.UpdateResult {
    return knexConnection('tb_whatsapp_dialogues')
      .update(convertCamelCaseKeysToSnakeCase(params))
      .where(convertCamelCaseKeysToSnakeCase(where));
  }

  create(
    params: IDialogueRepository.CreateParams,
  ): IDialogueRepository.CreateResult {
    return knexConnection('tb_whatsapp_dialogues').insert(
      convertCamelCaseKeysToSnakeCase(params),
    );
  }

  async listBySessionAndStatus(
    params: IDialogueRepository.ListBySessionAndStatusParams,
  ): IDialogueRepository.ListBySessionAndStatusResult {
    const dialogue = await knexConnection('tb_whatsapp_dialogues')
      .select('*')
      .where('session_id', params.sessionId)
      .andWhere('status', params.status)
      .first();

    return convertSnakeCaseKeysToCamelCase(dialogue);
  }
}
