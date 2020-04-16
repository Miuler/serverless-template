import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { echo } from '@lib/exampleQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hello: APIGatewayProxyHandler = async (event, _context) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: echo('Module aliasing is really the more best'),
      input: event,
    },
    null,
  ),
});
