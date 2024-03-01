import { ExternalServicesRepository } from '@/infra/db/mysql';
import { ListBookByIdService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeListBookByIdAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const listBookByIdService = new ListBookByIdService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    listBookById: listBookByIdService,
    externalService,
  };
};
