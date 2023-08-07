import { Injectable, NotFoundException } from '@nestjs/common';
import { CityRepositoryDTO } from './city.repository.dto';
import { CityDTO } from '../dtos/city.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CachedbService } from 'src/modules/cachedb/cachedb.service';

@Injectable()
export class CityRepository implements CityRepositoryDTO {
  constructor(
    private readonly db: PrismaService,
    private readonly cacheService: CachedbService,
  ) {}

  async list(state: string): Promise<CityDTO[]> {
    return this.cacheService.get<CityDTO[]>('CityDTO[]', () =>
      this.db.city.findMany({
        where: {
          state,
        },
      }),
    );
  }

  async show(id: number): Promise<CityDTO> {
    return this.exists(id);
  }

  async create(data: CityDTO): Promise<CityDTO> {
    // limpar o cache
    await this.cacheService.clear();

    return this.db.city.create({
      data,
    });
  }

  async update(id: number, data: CityDTO): Promise<CityDTO> {
    // limpar o cache
    await this.cacheService.clear();

    await this.exists(id);

    return this.db.city.update({
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

    await this.db.city.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<CityDTO> {
    const returnData = await this.db.city.findUnique({
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
