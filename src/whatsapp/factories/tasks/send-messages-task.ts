import { SendMessageZenviaService } from '@/infra/http';
import { RequestAdapter } from '@/infra/http/adapters';
import { httpZenviaClient } from '@/infra/http/clients';
import { SendMessagesJob } from '@/whatsapp/jobs/tasks';
import { HttpSendMessages } from '@/whatsapp/usecases';

export const sendMessagesTask = () => {
  const requestAdapter = new RequestAdapter(httpZenviaClient);

  const sendMessageService = new SendMessageZenviaService(requestAdapter);

  const dbSendMessages = new HttpSendMessages(sendMessageService);

  return new SendMessagesJob(dbSendMessages);
};
