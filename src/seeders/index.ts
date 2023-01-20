import { handlerPath } from 'src/libs/utils/handler-resolver';

export default {
  seeder: {
    handler: `${handlerPath(__dirname)}/seeder-handler.main`,
    events: [
      {
        http: {
          method: 'POST',
          path: 'seeder',
        },
      },
    ],
  },
};
