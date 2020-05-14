import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { echo } from '@lib/exampleQuery';
// eslint-disable-next-line import/extensions
import * as logger from '../core/logger';
// eslint-disable-next-line import/extensions
import * as http from '../core/http';

/**
 * Ejemplo de llamada a un servicio rest
 * @param event
 * @param context
 */
export const getUserLogin: APIGatewayProxyHandler = async (event, context) => {
  const log = logger.getLogger('getUserLogin');
  log.trace(event, 'event');
  log.trace(context, 'context');

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

  return {
    statusCode: 200,
    body: JSON.stringify({
      userLogin,
      message: echo('Module aliasing is really the more best'),
    }, null, 2),
  };
};
