import { BaseSchema } from 'yup';
import middy from '@middy/core';
import { APIGatewayProxyResult } from 'aws-lambda';
import { BodyParams, BodyParamsArray, EventParams, Handler, QueryParams } from '../types/types';
import { StatusCode } from '../enums/status-code.enum';
import { httpServerError } from '../utils/response';

export function schemaValidator<P extends EventParams>(schema: {
  body?: BaseSchema<P extends BodyParams | BodyParamsArray ? P['body'] : never>;
  queryStringParameters?: BaseSchema<BaseSchema<P extends QueryParams ? P['queryStringParameters'] : never>>;
}): middy.MiddlewareObj<Parameters<Handler<P>>[0], APIGatewayProxyResult> {
  const before: middy.MiddlewareFn<Parameters<Handler<P>>[0], APIGatewayProxyResult> = async (request) => {
    try {
      const { body, queryStringParameters } = request.event;

      /**
       * Validates @param body using YupJS with configuration
       * @param options "abortEarly" to false to return all validation errors
       * & "stripUnknown" to true so that it will remove unnecessary properties
       * from the request body payload.
       *
       * @property body will be re-assigned @line31 after transformation
       * @see https://github.com/jquense/yup/tree/pre-v1 for more details.
       *
       * @returns empty Promise or httpError if validation fails.
       */
      if (schema.body) {
        try {
          const middyfied = await schema.body.validate(body, { abortEarly: false, stripUnknown: true });

          request.event.body = Array.isArray(middyfied) ? middyfied : { ...middyfied };
        } catch (error) {
          /**
           * Note: The @param error is only for Middy with an instance @ValidationError.
           * Reduces the @param error.inner to include @path & @message only.
           *
           * Example output:
           * [
           *   {"path":"lake.id","message":"Lake not found"},
           *   {"path":"siteStatus.id","message":"Valid site status are only Active: 1, Inactive: 2, Sterilized: 3"}
           * ]
           */

          const errorMessages = error.inner.reduce((errors, { path, message }) => {
            errors.push({
              path,
              message,
            });

            return errors;
          }, []);

          return httpServerError(errorMessages, StatusCode.BAD_REQUEST);
        }
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters ?? {});
      }

      return Promise.resolve();
    } catch (error) {
      return httpServerError(error);
    }
  };

  return {
    before,
  };
}
