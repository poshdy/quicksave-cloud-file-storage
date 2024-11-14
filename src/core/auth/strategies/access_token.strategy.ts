import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../types/auth.types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: UserPayload) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
