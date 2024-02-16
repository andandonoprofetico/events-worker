import pkg from '@/../package.json';
import { LOGGER, SERVER } from '@/utils';
import { Logger, createLogger, format, transports } from 'winston';

import { standard } from './formats';

export type LogParams = {
  level:
    | 'error'
    | 'warn'
    | 'info'
    | 'http'
    | 'verbose'
    | 'debug'
    | 'silly'
    | String;
  message: string;
  payload?: object;
  meta?: object;
  [key: string]: unknown;
};

const { combine, timestamp } = format;

const defaultTimestampFormat = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

export class CustomLogger {
  private static instance: CustomLogger;

  private logger!: Logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: LOGGER.CONSOLE.LEVEL,
          format: combine(defaultTimestampFormat, standard),
        }),
      ],
    });
  }

  public static getInstance(): CustomLogger {
    if (!CustomLogger.instance) {
      CustomLogger.instance = new CustomLogger();
    }

    return CustomLogger.instance;
  }

  public log(error: Error): void;
  public log(params: LogParams): void;
  public log(params: LogParams | Error): void {
    const application = {
      name: pkg.name ?? 'nodejs-application',
      app_env: SERVER.APP_ENV,
      node_env: SERVER.NODE_ENV,
    };

    if (params instanceof Error) {
      this.logger.log({
        application,
        message: 'An error',
        error: {
          name: params.name,
          message: params.message,
          stack: params.stack,
        },
        level: 'error',
      });

      return;
    }

    const { level, message, ...rest } = params;

    this.logger.log({
      application,
      message,
      level: <string>level,
      ...rest,
    });
  }
}
