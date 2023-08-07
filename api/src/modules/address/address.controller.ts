import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDTO } from './dtos/address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async index(@Query() { userId }) {
    return this.addressService.list(Number(userId));
  }

  @Post()
  async create(@Body() data: AddressDTO) {
    return this.addressService.create(data);
  }

  @Put(':id')
  async update(@Body() data: AddressDTO, @Param() params: any) {
    return this.addressService.update(Number(params.id), data);
  }

  @Delete(':id')
  async destroy(@Param() params: any) {
    await this.addressService.delete(Number(params.id));
  }
}
