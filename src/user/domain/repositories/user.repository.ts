import { User } from '../entities/User';

export interface UserRepository {
  create(user: User): Promise<any>;
  findById(id: number): Promise<any>;
  findAll(): Promise<any[]>;
}
