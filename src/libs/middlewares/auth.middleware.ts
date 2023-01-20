import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCode } from '../enums/status-code.enum';
import { decode } from 'jsonwebtoken';
import { Handler } from '../types/types';
import { httpServerError } from '../utils/response';

export function authMiddleware(): middy.MiddlewareObj<Parameters<Handler<any>>[0], APIGatewayProxyResult> {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const authHeader = request.event.headers['Authorization'] || request.event.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decodedToken = decode(token, { complete: true })?.payload;

      globalThis.currentUserName = `${decodedToken['given_name']} ${decodedToken['family_name']}`;

      (request.context as unknown as any)['account'] = decodedToken;

      return Promise.resolve();
    }

    return httpServerError('Unauthorized', StatusCode.UNAUTHORIZED);
  };

  return {
    before,
  };
}
