import pino from 'pino';

export function getLogger(logger: string): pino.Logger {
  let prettyPrint: pino.PrettyOptions;
  let level: string;
  if ((process.env.IS_LOCAL) || (process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined)) {
    prettyPrint = { colorize: true };
    level = 'debug';
  }
  return pino({
    prettyPrint,
    level, // warn
    logger,
  });
}
