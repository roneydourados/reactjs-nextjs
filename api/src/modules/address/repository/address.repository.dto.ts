import { AddressDTO } from '../dtos/address.dto';

export interface AddressRepositoryDTO {
  list(userId: number): Promise<AddressDTO[]>;
  show(id: number): Promise<AddressDTO>;
  create(data: AddressDTO): Promise<AddressDTO>;
  update(id: number, data: AddressDTO): Promise<AddressDTO>;
  delete(id: number): Promise<void>;
  exists?(id: number): Promise<AddressDTO>;
}
