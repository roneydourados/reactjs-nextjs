import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { CachedbService } from 'src/modules/cachedb/cachedb.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HashService } from 'src/modules/hash/hash.service';
import { UserRepositoryDTO } from './user.repository.dto';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserRepository implements UserRepositoryDTO {
  constructor(
    private readonly cacheService: CachedbService,
    private readonly db: PrismaService,
    private readonly hash: HashService,
  ) {}

  async list(): Promise<UserDTO[]> {
    return this.cacheService.get<UserDTO[]>('UserDTO[]', () =>
      this.db.user.findMany(),
    );
  }
  async show(id: number): Promise<UserDTO> {
    return this.exists(id);
  }
  async create(data: UserDTO, role?: Role): Promise<UserDTO> {
    data.password = await this.hash.hashText(data.password);

    return this.db.user.create({
      data,
    });
  }

  async update(id: number, data: UserDTO, role?: Role): Promise<UserDTO> {
    await this.exists(id);

    return this.db.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<void> {
    await this.exists(id);

    await this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<UserDTO> {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`Nenhum dado encontrado com id: ${id}`);
    }

    return user;
  }
}
