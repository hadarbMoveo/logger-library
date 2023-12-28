import * as winston from 'winston';

const createLogger = (serviceName: string,level:string,maxFiles:number,maxSizeInMB:number) => {

  function megabytesToBytes(megabytes: number): number {
   return megabytes * 1024 * 1024;
  }

  const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
  );

  const logger = winston.createLogger({
    level,
    format,
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: format,
        maxsize: megabytesToBytes(maxSizeInMB),
        maxFiles: maxFiles,
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info',
        format: format, 
      }),
    ],
  });

  if (process.env['NODE_ENV'] !== 'production') {
    logger.add(
      new winston.transports.Console({
        level: 'debug', 
        format: format, 
      })
    );
  }

  return logger;
};

export { createLogger };