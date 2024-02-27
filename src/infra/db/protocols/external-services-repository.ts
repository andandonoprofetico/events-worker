import { ExternalServices } from '@/application/domain';

export interface IExternalServicesRepository {
  listByNameAndCompany<T = any>(
    params: IExternalServicesRepository.ListByNameAndCompanyParams,
  ): IExternalServicesRepository.ListByNameAndCompanyResult<T>;
  listByName<T = any>(
    name: string,
  ): IExternalServicesRepository.ListByNameResult<T>;
  update(
    params: IExternalServicesRepository.UpdateParams,
    id: number,
  ): IExternalServicesRepository.UpdateResult;
}

export namespace IExternalServicesRepository {
  export type ListByNameAndCompanyParams = {
    name: string;
    companyId: number;
  };

  export type ListByNameAndCompanyResult<T> = Promise<ExternalServices<T>>;

  export type ListByNameResult<T> = Promise<ExternalServices<T>[]>;

  export type UpdateParams = Partial<Pick<ExternalServices, 'data'>>;

  export type UpdateResult = Promise<any>;
}
