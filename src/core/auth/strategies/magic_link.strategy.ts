import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { MailsService } from 'src/common/mails/mails.service';
import { UsersService } from 'src/core/users/users.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(
  Strategy,
  'magic-link',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailsService,
    private readonly userService: UsersService,
  ) {
    super({
      secret: configService.getOrThrow('MAGIC_SECRET'),
      jwtOptions: {
        expiresIn: '5m',
      },

      callbackUrl: 'http://localhost:3000/auth/sign-in/callback',
      sendMagicLink: async (destination: string, link: string) => {
        await this.mailService.sendMagicLink(destination, link);
        return link;
      },
      verify: async (payload, callback) => {
        console.log(payload);
        callback(null, this.validate(payload));
      },
    });
  }

  async validate(payload: { destination: string }) {
    const user = await this.userService.getUserByEmail(payload.destination);
    return user;
  }
}
