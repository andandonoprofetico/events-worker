import { ExternalServicesRepository } from '@/infra/db/mysql';
import { ListBooksService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeListBooksAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const listBooksService = new ListBooksService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    listBooks: listBooksService,
    externalService,
  };
};
