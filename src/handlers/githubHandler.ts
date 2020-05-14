import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { echo } from '@lib/exampleQuery';
// eslint-disable-next-line import/extensions
import * as logger from '../core/logger';
// eslint-disable-next-line import/extensions
import * as http from '../core/http';

/**
 * Example of the call to BUS
 * @param event
 * @param _context
 */
export const getUserLogin: APIGatewayProxyHandler = async (event, _context) => {
  const log = logger.getLogger('getUserLogin');
  log.debug('event', event);

  const url = 'https://api.github.com/users/github';
  const userLogin = await http.get<User>(url)
    .then((userResponse) => {
      log.info('userResponse.data.id:', userResponse.data.id);
      log.info('userResponse.data.login:', userResponse.data.login);
      log.warn('test userResponse.data.login:', userResponse.data.login);
      log.error('error test userResponse.data.login:', userResponse.data.login);
      return userResponse.data;
    }).then((user) => {
      log.info('user: {}', user);
      log.warn('warn user: {}', user);
      return user.login;
    });

  log.info('userLogin: ', userLogin);

  return {
    statusCode: 200,
    body: JSON.stringify({
      userLogin,
      message: echo('Module aliasing is really the more best'),
    }, null, 2),
  };
};
