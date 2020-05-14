import pino from 'pino';

export function getLogger(name: string) {
  let prettyPrint: pino.PrettyOptions;
  if ((process.env.IS_LOCAL) || (process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined)) {
    prettyPrint = { colorize: true };
  }
  return pino({
    prettyPrint,
    logger: name,
  });
}
