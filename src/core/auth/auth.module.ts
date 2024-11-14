import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { AuthHelpers } from './services/auth.helpers.service';
import { UserAuthRepo } from '../users/repoistories/users.auth.repo';
import { UsersModule } from '../users/users.module';
import { AccessTokenStrategy } from './strategies/access_token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh_token.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MagicLinkStrategy } from './strategies/magic_link.strategy';
import { MailsModule } from 'src/common/mails/mails.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule, JwtModule.register({}), MailsModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHelpers,
    UsersService,
    UserAuthRepo,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    MagicLinkStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
