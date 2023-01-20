export default interface UserRepositoryInterface<T> {
  find(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  create(data: object): Promise<T>;
}
