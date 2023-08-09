import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return this.userService.list();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(@Body() data: UserDTO, @Param() { id }) {
    return this.userService.update(Number(id), data);
  }

  @Delete(':id')
  async destroy(@Param() { id }) {
    await this.userService.delete(Number(id));
  }
}
