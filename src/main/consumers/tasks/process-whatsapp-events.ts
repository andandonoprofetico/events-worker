import { taskAdapter } from '@/main/adapters/adapt-tasks';
import { AWS, logger } from '@/utils';

import { Options } from '../protocols';

export const processWhatsAppEventsTask: Options = {
  enabled: true,
  queue: AWS.SQS.WHATSAPP_QUEUE,
  handler: taskAdapter({
    handle: (message, state) => {
      logger.log({
        level: 'info',
        message: 'Message received',
        data: message,
        state,
      });
    },
  }),
};
