import { Injectable } from '@nestjs/common';
import { AddressDTO } from './dtos/address.dto';
import { AddressRepository } from './repository/address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async list(userId: number): Promise<AddressDTO[]> {
    return this.addressRepository.list(userId);
  }

  async show(id: number): Promise<AddressDTO> {
    return this.addressRepository.show(id);
  }

  async create(data: AddressDTO): Promise<AddressDTO> {
    return this.addressRepository.create(data);
  }

  async update(id: number, data: AddressDTO): Promise<AddressDTO> {
    return this.addressRepository.update(id, data);
  }
  async delete(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
