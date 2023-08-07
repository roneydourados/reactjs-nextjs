import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { UserRepositoryDTO } from './user.repository.dto';
import { UserDTO } from '../dtos/user.dto';
import { CachedbService } from 'src/providers/cachedb/cachedb.service';
import { HashService } from 'src/providers/hash/hash.service';

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

  async create(data: UserDTO): Promise<UserDTO> {
    // limpar o cache
    await this.cacheService.clear();

    data.password = await this.hash.hashText(data.password);

    return this.db.user.create({
      data,
    });
  }

  async update(id: number, data: UserDTO): Promise<UserDTO> {
    // limpar o cache
    await this.cacheService.clear();

    await this.exists(id);

    return this.db.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number): Promise<void> {
    // limpar o cache
    await this.cacheService.clear();

    await this.exists(id);

    await this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<UserDTO> {
    const returnData = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!returnData) {
      throw new NotFoundException(`Nenhum dado encontrado com id: ${id}`);
    }

    return returnData;
  }
}
