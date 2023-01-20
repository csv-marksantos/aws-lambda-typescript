import { dataSourceOptsForSeeder } from 'src/libs/db/data-source';
import { DatabaseClient } from 'src/libs/db/database.client';
import { createProtectedHandler } from 'src/libs/middlewares/handlers';
import { httpResponse, httpServerError } from 'src/libs/utils/response';

export const main = createProtectedHandler(async (event) => {
  try {
    const dataSourceOpts = await dataSourceOptsForSeeder(
      event.queryStringParameters.dropSchema === 'true',
    ).initialize();
    await new DatabaseClient();

    return httpResponse({
      success: true,
    });
  } catch ($ex) {
    return httpServerError($ex);
  }
});
