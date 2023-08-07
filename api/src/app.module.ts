import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './providers/prisma/prisma.service';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CityModule } from './modules/city/city.module';
import { AddressModule } from './modules/address/address.module';
import { CachedbModule } from './providers/cachedb/cachedb.module';
import { HashModule } from './providers/hash/hash.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      ttl: 10000,
    }),
    PrismaModule,
    UserModule,
    CachedbModule,
    HashModule,
    CityModule,
    AddressModule,
  ],
  controllers: [],
  providers: [PrismaService, UserService],
})
export class AppModule {}
