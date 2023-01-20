import { APIGatewayProxyResult } from 'aws-lambda';
import { StatusCode } from '../enums/status-code.enum';

export function httpResponse<T>(
  response: Record<string, unknown> | Record<string, unknown>[] | T[],
  { statusCode = StatusCode.OK, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: StatusCode.OK,
  },
): APIGatewayProxyResult {
  return {
    body: JSON.stringify(response),
    statusCode,
    ...rest,
  };
}

/**
 * @deprecated - please use @httpServerError function below
 */
export function httpError(
  error: unknown,
  { statusCode = StatusCode.INTERNAL_SERVER_ERROR, ...rest }: Omit<APIGatewayProxyResult, 'body'> = {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
  },
): APIGatewayProxyResult {
  return {
    body: JSON.stringify(typeof error === 'string' ? { message: error, status: statusCode } : error),
    statusCode,
    ...rest,
  };
}

/**
 * Returns http error as valid response for API Gateway
 * @param error - from the handler or services
 * @param statusCode - HTTP status code of the error
 * with default value of 500 as internal server error.
 * Can be customize and just open StatusCode enum
 * @returns object of APIGatewayProxyResult
 */
export function httpServerError(error: unknown, statusCode = StatusCode.INTERNAL_SERVER_ERROR): APIGatewayProxyResult {
  /**
   * Logs event to Cloudwatch for easy debugging
   */
  console.error({ error });

  if (typeof error === 'string') {
    return {
      body: JSON.stringify({ message: error, status: statusCode }),
      statusCode,
    };
  }

  if (Array.isArray(error)) {
    return {
      body: JSON.stringify(error),
      statusCode,
    };
  }

  return {
    body: JSON.stringify({ message: 'Internal Server Error', status: statusCode }),
    statusCode,
  };
}
