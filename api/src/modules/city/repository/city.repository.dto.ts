import { CityDTO } from '../dtos/city.dto';

export interface CityRepositoryDTO {
  list(state: string): Promise<CityDTO[]>;
  show(id: number): Promise<CityDTO>;
  create(data: CityDTO): Promise<CityDTO>;
  update(id: number, data: CityDTO): Promise<CityDTO>;
  delete(id: number): Promise<void>;
  exists?(id: number): Promise<CityDTO>;
}
