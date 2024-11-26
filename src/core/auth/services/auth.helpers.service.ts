import { compare, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { IAuthServiceHelpers } from '../interfaces/auth-service';
import { Tokens, UserPayload } from '../types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class AuthHelpers implements IAuthServiceHelpers {
  constructor(
    private readonly jwtService: JwtService,
    private readonly events: EventEmitter2,
  ) {}
  async compareHash(data: string, hash: string): Promise<boolean> {
    return await compare(data, hash);
  }
  async generateTokens(user: UserPayload): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(user, {
        expiresIn: 60 * 15,
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      this.jwtService.signAsync(user, {
        expiresIn: 60 * 60 * 24 * 10,
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async hashData(data: string): Promise<string> {
    return await hash(data, 12);
  }
  async updateRt(userId: string, refresh_token: string) {
    const rt = await this.hashData(refresh_token);
    await this.events.emitAsync('token.update', userId, rt);
  }
}
