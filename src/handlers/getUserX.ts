import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as logger from '@core/logger';
import * as http from '@core/http';

/**
 * Ejemplo de llamada a un servicio rest
 * @param event
 * @param context
 */
export const handler: APIGatewayProxyHandler = async (event, context) => {
  const log = logger.getLogger('getUserInfoHandler');
  const country = event.headers['CloudFront-Viewer-Country'];
  log.trace(event, 'event');
  log.trace(context, 'context');
  const { user } = event.pathParameters;

  const userLogin = await getUserX(user);

  return {
    statusCode: 200,
    body: JSON.stringify({
      requestOrigin: country,
      userLogin,
    }, null, 2),
  };
};

/**
 * Mantenr la logica de negocio separado
 */
export async function getUserX(user: string): Promise<string> {
  const log = logger.getLogger('getUserX'.concat(user));
  const url = 'https://api.github.com/users/'.concat(user);
  const userLogin = await http.get<User>(url)
    .then((userResponse) => {
      log.debug('userResponse.headers: %s', userResponse.headers);
      return userResponse.data;
    }).then((_user) => {
      log.trace(_user, 'user');
      log.info('user.id: %s', _user.id);
      return _user.login;
    });

  log.info('userLogin: %s', userLogin);
  return userLogin;
}
