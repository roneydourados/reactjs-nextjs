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
  async index(@Query() { state }) {
    return this.cityService.list(state);
  }

  @Post()
  async create(@Body() data: CityDTO) {
    return this.cityService.create(data);
  }

  @Put(':id')
  async update(@Body() data: CityDTO, @Param() { id }) {
    return this.cityService.update(Number(id), data);
  }

  @Delete(':id')
  async destroy(@Param() { id }) {
    await this.cityService.delete(Number(id));
  }
}
