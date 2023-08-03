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
import { CityService } from './city.service';
import { CityDTO } from './dtos/city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index(@Query() state: string) {
    return this.cityService.list(state);
  }

  @Post()
  async create(@Body() data: CityDTO) {
    return this.cityService.create(data);
  }

  @Put(':id')
  async update(@Body() data: CityDTO, @Param() params: any) {
    return this.cityService.update(Number(params.id), data);
  }

  @Delete(':id')
  async destroy(@Param() params: any) {
    await this.cityService.delete(Number(params.id));
  }
}
