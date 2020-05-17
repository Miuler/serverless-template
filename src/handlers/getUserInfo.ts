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
  log.trace(event, 'event');
  log.trace(context, 'context');

  const userLogin = await getUserInfo();

  return {
    statusCode: 200,
    body: JSON.stringify({
      userLogin,
    }, null, 2),
  };
};

/**
 * Mantenr la logica de negocio separado
 */
export async function getUserInfo(): Promise<string> {
  const log = logger.getLogger('getUserInfo');
  const url = 'https://api.github.com/users/github';
  const userLogin = await http.get<User>(url)
    .then((userResponse) => {
      log.debug('userResponse.headers: %s', userResponse.headers);
      return userResponse.data;
    }).then((user) => {
      log.trace(user, 'user');
      log.info('user.id: %s', user.id);
      return user.login;
    });

  log.info('userLogin: %s', userLogin);
  return userLogin;
}
