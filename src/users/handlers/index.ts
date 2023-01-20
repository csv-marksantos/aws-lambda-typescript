import { handlerPath } from 'src/libs/utils/handler-resolver';

export default {
  'get-users': {
    handler: `${handlerPath(__dirname)}/get-users-handler.main`,
    events: [
      {
        http: {
          method: 'GET',
          path: 'users',
        },
      },
    ],
  },
};
