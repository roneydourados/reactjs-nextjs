import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CachedbModule } from '../cachedb/cachedb.module';
import { CityRepository } from './repository/city.repository';

@Module({
  imports: [PrismaModule, CachedbModule],
  providers: [CityService, CityRepository],
  controllers: [CityController],
})
export class CityModule {}
