import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CityDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  state: string;
}
