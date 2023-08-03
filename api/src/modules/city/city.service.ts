import { Injectable } from '@nestjs/common';
import { CityRepository } from './repository/city.repository';
import { CityDTO } from './dtos/city.dto';

@Injectable()
export class CityService {
  constructor(private readonly cityRepsitory: CityRepository) {}

  async list(state: string): Promise<CityDTO[]> {
    return this.cityRepsitory.list(state);
  }

  async show(id: number): Promise<CityDTO> {
    return this.cityRepsitory.show(id);
  }

  async create(data: CityDTO): Promise<CityDTO> {
    return this.cityRepsitory.create(data);
  }

  async update(id: number, data: CityDTO): Promise<CityDTO> {
    return this.cityRepsitory.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.cityRepsitory.delete(id);
  }
}
