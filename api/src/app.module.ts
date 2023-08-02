import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { CachedbModule } from './modules/cachedb/cachedb.module';
import { CacheModule } from '@nestjs/cache-manager';
import { HashModule } from './modules/hash/hash.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
