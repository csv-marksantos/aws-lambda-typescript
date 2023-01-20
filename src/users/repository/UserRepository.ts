import { DatabaseClient } from 'src/libs/db/database.client';
import UserRepositoryInterface from './UserRepositoryInterface';

export class UserRepository implements UserRepositoryInterface<any> {
  constructor() {}

  findAll(): Promise<any[]> {
    return Promise.resolve([]);
  }
  find(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  create(data: object): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
