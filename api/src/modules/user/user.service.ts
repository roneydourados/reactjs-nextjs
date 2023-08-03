import { Injectable } from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepsitory: UserRepository) {}

  async list(): Promise<UserDTO[]> {
    return this.userRepsitory.list();
  }

  async show(id: number): Promise<UserDTO> {
    return this.userRepsitory.show(id);
  }

  async create(data: UserDTO): Promise<UserDTO> {
    return this.userRepsitory.create(data);
  }

  async update(id: number, data: UserDTO): Promise<UserDTO> {
    return this.userRepsitory.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.userRepsitory.delete(id);
  }
}
