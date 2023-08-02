import { Injectable } from '@nestjs/common';
import { UserRepositoryDTO } from './repository/user.repository.dto';
import { Role } from 'src/enums/role.enum';
import { UserDTO } from './dtos/user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService implements UserRepositoryDTO {
  constructor(private readonly userRepsitory: UserRepository) {}

  async list(): Promise<UserDTO[]> {
    return this.userRepsitory.list();
  }

  async show(id: number): Promise<UserDTO> {
    return this.userRepsitory.show(id);
  }

  async create(data: UserDTO, role?: Role): Promise<UserDTO> {
    return this.userRepsitory.create(data);
  }

  async update(id: number, data: UserDTO, role?: Role): Promise<UserDTO> {
    return this.userRepsitory.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.userRepsitory.delete(id);
  }
}
