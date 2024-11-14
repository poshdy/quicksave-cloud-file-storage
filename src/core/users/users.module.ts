import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserAuthRepo } from './repoistories/users.auth.repo';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserAuthRepo],
  exports: [UserAuthRepo],
})
export class UsersModule {}
