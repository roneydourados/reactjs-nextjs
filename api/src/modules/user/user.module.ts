import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { HashModule } from 'src/providers/hash/hash.module';
import { CachedbModule } from 'src/providers/cachedb/cachedb.module';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, HashModule, CachedbModule],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
