import { ExternalServicesRepository } from '@/infra/db/mysql';
import { SendMessageService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpBackendClient } from '@/infra/http/clients';

export const makeSendMessageAction = () => {
  const requestAdapter = new RequestAdapter(httpBackendClient);

  const sendMessageService = new SendMessageService(requestAdapter);

  const externalService = new ExternalServicesRepository();

  return {
    sendMessage: sendMessageService,
    externalService,
  };
};
