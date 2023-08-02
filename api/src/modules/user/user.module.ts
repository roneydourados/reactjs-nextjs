import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HashModule } from '../hash/hash.module';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { CachedbModule } from '../cachedb/cachedb.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, HashModule, CachedbModule],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
