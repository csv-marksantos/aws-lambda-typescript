import { User } from 'src/entities';
import { DatabaseClient } from 'src/libs/db/database.client';
import UserRepositoryInterface from './UserRepositoryInterface';

export class UserRepository implements UserRepositoryInterface<any> {
  constructor(private dataSource: DatabaseClient) {}

  async findAll(): Promise<User[]> {
    const dataSource = await this.dataSource.initialize();

    return await dataSource.manager.getRepository(User).find();

    // return Promise.resolve([]);
  }
  find(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  create(data: object): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
