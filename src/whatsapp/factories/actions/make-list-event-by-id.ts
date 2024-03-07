import { ExternalServicesRepository } from '@/infra/db/mysql';
import { ListEventByIdService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeListEventByIdAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const listEventByIdService = new ListEventByIdService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    listEventById: listEventByIdService,
    externalService,
  };
};
