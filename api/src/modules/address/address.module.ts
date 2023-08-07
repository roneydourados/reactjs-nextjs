import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CachedbModule } from '../cachedb/cachedb.module';
import { AddressRepository } from './repository/address.repository';

@Module({
  imports: [PrismaModule, CachedbModule],
  providers: [AddressService, AddressRepository],
  controllers: [AddressController],
})
export class AddressModule {}
