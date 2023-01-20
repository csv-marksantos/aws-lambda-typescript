import { DatabaseClient } from '../../libs/db/database.client';
import { UserRepository } from './UserRepository';

const userRepository = new UserRepository(new DatabaseClient());

export default userRepository;
