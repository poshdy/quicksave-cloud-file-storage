import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../types/auth.types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['quicksaveToken'];
          }
          return token;
        },
      ]),
      secretOrKey: configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
      ignoreExpiration: false,
    });
  }

  async validate(request: Request, payload: UserPayload) {
    const refresh_token = request.cookies['quicksaveToken'];
    return {
      ...payload,
      refresh_token,
    };
  }
}
