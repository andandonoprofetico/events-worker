import { ExternalServicesRepository } from '@/infra/db/mysql';
import { ListEventsService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeListEventsAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const listEventsService = new ListEventsService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    listEvents: listEventsService,
    externalService,
  };
};
