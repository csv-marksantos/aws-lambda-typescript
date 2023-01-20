import { createProtectedHandler } from 'src/libs/middlewares/handlers';
import { httpResponse, httpServerError } from 'src/libs/utils/response';
import userRepository from '../repository';

export const main = createProtectedHandler(async (event) => {
  try {
    const users$ = await userRepository.findAll();

    return httpResponse(users$);
  } catch (error) {
    console.log(error);
    return httpServerError(error);
  }
});

// main.use([]);
