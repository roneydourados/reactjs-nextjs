import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddressDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  userId?: number;

  @IsNumber()
  cityId?: number;

  @IsString()
  complement: string;

  @IsString()
  number: string;

  @IsString()
  cep: string;

  @IsString()
  street: string;
}
