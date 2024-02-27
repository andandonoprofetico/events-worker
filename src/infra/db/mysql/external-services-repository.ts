import {
  convertCamelCaseKeysToSnakeCase,
  convertSnakeCaseKeysToCamelCase,
} from '@/utils';

import { IExternalServicesRepository } from '../protocols';
import { knexConnection } from './helper';

export class ExternalServicesRepository implements IExternalServicesRepository {
  async listByNameAndCompany<T = any>(
    params: IExternalServicesRepository.ListByNameAndCompanyParams,
  ): IExternalServicesRepository.ListByNameAndCompanyResult<T> {
    const services = await knexConnection('tb_external_services')
      .select('*')
      .where('name', params.name)
      .andWhere('company_id', params.companyId)
      .whereNull('deleted_at')
      .first();

    return convertSnakeCaseKeysToCamelCase(services);
  }

  update(
    params: IExternalServicesRepository.UpdateParams,
    id: number,
  ): IExternalServicesRepository.UpdateResult {
    return knexConnection('tb_external_services')
      .update(convertCamelCaseKeysToSnakeCase(params))
      .where('external_service_id', id);
  }

  async listByName<T = any>(
    name: string,
  ): IExternalServicesRepository.ListByNameResult<T> {
    const services = await knexConnection('tb_external_services')
      .select('*')
      .where('name', name)
      .whereNull('deleted_at');

    return convertSnakeCaseKeysToCamelCase(services);
  }
}
