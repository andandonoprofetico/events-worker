import { ExternalServicesRepository } from '@/infra/db/mysql';
import { RequestAdapter } from '@/infra/http/adapters';
import { ListUserTokenService } from '@/infra/http/backend';
import { httpBackendClient } from '@/infra/http/clients';

import { OnInitBackend } from '../on-init';

export const makeBackendFacade = () => {
  const externalServicesRepository = new ExternalServicesRepository();

  const requestAdapter = new RequestAdapter(httpBackendClient);

  const listUserTokenService = new ListUserTokenService(requestAdapter);

  return new OnInitBackend(externalServicesRepository, listUserTokenService);
};
