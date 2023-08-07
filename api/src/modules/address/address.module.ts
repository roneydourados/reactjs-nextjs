import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { AddressRepository } from './repository/address.repository';
import { CachedbModule } from 'src/providers/cachedb/cachedb.module';

@Module({
  imports: [PrismaModule, CachedbModule],
  providers: [AddressService, AddressRepository],
  controllers: [AddressController],
})
export class AddressModule {}
