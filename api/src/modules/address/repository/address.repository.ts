import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepositoryDTO } from './address.repository.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CachedbService } from 'src/modules/cachedb/cachedb.service';
import { AddressDTO } from '../dtos/address.dto';

@Injectable()
export class AddressRepository implements AddressRepositoryDTO {
  constructor(
    private readonly db: PrismaService,
    private readonly cacheService: CachedbService,
  ) {}

  async list(userId: number): Promise<AddressDTO[]> {
    return this.cacheService.get<AddressDTO[]>(`AddressDTO[]-${userId}`, () =>
      this.db.address.findMany({
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

    return this.db.address.create({
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

    return this.db.address.update({
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

    await this.db.address.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number): Promise<AddressDTO> {
    const returnData = await this.db.address.findUnique({
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
