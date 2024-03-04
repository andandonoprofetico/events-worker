import { ExternalServicesRepository } from '@/infra/db/mysql';
import { SendFormService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeSendFormAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const sendFormService = new SendFormService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    sendForm: sendFormService,
    externalService,
  };
};
