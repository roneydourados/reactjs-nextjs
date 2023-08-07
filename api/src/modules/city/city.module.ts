import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { CityRepository } from './repository/city.repository';
import { CachedbModule } from 'src/providers/cachedb/cachedb.module';

@Module({
  imports: [PrismaModule, CachedbModule],
  providers: [CityService, CityRepository],
  controllers: [CityController],
})
export class CityModule {}
