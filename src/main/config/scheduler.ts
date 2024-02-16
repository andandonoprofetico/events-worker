import { Sqs } from '@/infra/aws/sqs';
import * as consumers from '@/main/consumers';
import { logger } from '@/utils';

export const consumersSetup = async (sqs: Sqs) => {
  const tasks = Object.values(consumers.tasks)
    .filter((task) => task.enabled)
    .map((task) => {
      return sqs.consume(task.queue, {
        handler: task.handler,
      });
    });

  tasks.map((task) => task.start());

  process.on('SIGTERM', () => {
    tasks.map((task) => task.stop());

    logger.log({
      level: 'info',
      message: 'Graceful shutdown complete',
    });
  });
};
