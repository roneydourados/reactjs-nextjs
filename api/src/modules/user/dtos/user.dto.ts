import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UserDTO {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  type?: number;
}
