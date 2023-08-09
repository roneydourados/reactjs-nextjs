import { Injectable, NotFoundException } from '@nestjs/common';
import { CityRepositoryDTO } from './city.repository.dto';
import { CityDTO } from '../dtos/city.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CachedbService } from 'src/providers/cachedb/cachedb.service';

@Injectable()
export class CityRepository implements CityRepositoryDTO {
  constructor(
    private readonly dbService: PrismaService,
    private readonly cacheService: CachedbService,
  ) {}

  async list(state: string): Promise<CityDTO[]> {
    return this.cacheService.get<CityDTO[]>(`CityDTO[]-${state}`, () =>
      this.dbService.city.findMany({
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

    return this.dbService.city.create({
      data,
    });
  }

  async update(id: number, data: CityDTO): Promise<CityDTO> {
    // limpar o cache
    await this.cacheService.clear();

    await this.exists(id);

    return this.dbService.city.update({
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

    await this.dbService.city.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<CityDTO> {
    const returnData = await this.dbService.city.findUnique({
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
