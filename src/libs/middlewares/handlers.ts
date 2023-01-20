import cors from '@middy/http-cors';
import errorLogger from '@middy/error-logger';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpPartialResponse from '@middy/http-partial-response';
import httpResponseSerializerMiddleware from '@middy/http-response-serializer';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';

import { authMiddleware } from './auth.middleware';
import { EventParams, Handler } from '../types/types';

export function createHandler<P extends EventParams, isProtected extends boolean = false>(
  handler: Handler<P, isProtected>,
) {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpEventNormalizer())
    .use(middyJsonBodyParser())
    .use(httpPartialResponse())
    .use(errorLogger())
    .use(httpErrorHandler())
    .use(
      httpResponseSerializerMiddleware({
        serializers: [
          {
            regex: /^application\/xml$/,
            serializer: ({ body }) => `<message>${body}</message>`,
          },
          {
            regex: /^text\/plain$/,
            serializer: ({ body }) => body,
          },
        ],
        defaultContentType: 'application/json',
      }),
    );
}

export function createProtectedHandler<P extends EventParams>(handler: Handler<P>) {
  return createHandler(handler)
    .use(authMiddleware())
    .use(
      cors({
        headers: 'Access-Control-Allow-Headers',
        methods: 'Access-Control-Allow-Methods',
        exposeHeaders: 'Access-Control-Expose-Headers',
        origin: '*',
        requestHeaders: 'Access-Control-Request-Headers',
        requestMethods: 'Access-Control-Request-Methods',
      }),
    );
}
