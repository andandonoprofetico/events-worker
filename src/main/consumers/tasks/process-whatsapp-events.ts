import { taskAdapter } from '@/main/adapters/adapt-tasks';
import { AWS } from '@/utils';
import { whatsAppTasks } from '@/whatsapp';

import { Options } from '../protocols';

export const processWhatsAppEventsTask: Options = {
  enabled: true,
  queue: AWS.SQS.WHATSAPP_QUEUE,
  handler: taskAdapter(whatsAppTasks.listSessionTask()),
};
