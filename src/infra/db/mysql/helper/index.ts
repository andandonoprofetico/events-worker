import { DATABASE } from '@/utils/constants';
import knex from 'knex';

export const knexConnection = knex({
  client: DATABASE.DIALECT,
  connection: {
    host: DATABASE.HOST,
    user: DATABASE.USERNAME,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    typeCast: (field: any, next: Function) => {
      if (field.type === 'BIT' && field.length === 1) {
        const bytes = field.buffer();

        return bytes[0] === 1;
      }

      return next();
    },
  },
});
