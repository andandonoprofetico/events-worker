import { Sqs } from '@/infra/aws/sqs';
import { knexConnection } from '@/infra/db/mysql/helper';
import { logger } from '@/utils';

import { consumersSetup } from './config/scheduler';
import { makeOnInit } from './facades';

(async () => {
  try {
    const sqs = new Sqs();

    await knexConnection.raw('SELECT 1');
    await makeOnInit();

    consumersSetup(sqs);

    logger.log({ level: 'info', message: 'Consumer started!' });
  } catch (error) {
    logger.log(error as Error);
  }
})();
