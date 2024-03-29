import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepositoryDTO } from './address.repository.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { AddressDTO } from '../dtos/address.dto';
import { CachedbService } from 'src/providers/cachedb/cachedb.service';

@Injectable()
export class AddressRepository implements AddressRepositoryDTO {
  constructor(
    private readonly dbService: PrismaService,
    private readonly cacheService: CachedbService,
  ) {}

  async list(userId: number): Promise<AddressDTO[]> {
    return this.cacheService.get<AddressDTO[]>(`AddressDTO[]-${userId}`, () =>
      this.dbService.address.findMany({
        where: {
          userId,
        },
      }),
    );
  }

  async show(id: number): Promise<AddressDTO> {
    return this.exists(id);
  }

  async create({
    cep,
    complement,
    number,
    street,
    cityId,
    userId,
  }: AddressDTO): Promise<AddressDTO> {
    // limpar o cache
    await this.cacheService.clear();

    return this.dbService.address.create({
      data: {
        cep,
        complement,
        number,
        street,
        cityId,
        userId,
      },
    });
  }

  async update(id: number, data: AddressDTO): Promise<AddressDTO> {
    // limpar o cache
    await this.cacheService.clear();

    await this.exists(id);

    return this.dbService.address.update({
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

    await this.dbService.address.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<AddressDTO> {
    const returnData = await this.dbService.address.findUnique({
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
