import { Injectable } from '@nestjs/common';
import { IUserAuthRepoistory } from '../interfaces/users.interface';
import { DatabaseService } from 'src/core/database/database.service';
import { User } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';
import { GoogleUserPayload } from 'src/core/auth/types/auth.types';

@Injectable()
export class UserAuthRepo implements IUserAuthRepoistory {
  constructor(private readonly database: DatabaseService) {}
  async createUser(data: GoogleUserPayload): Promise<User> {
    return await this.database.user.create({
      data,
    });
  }
  async getUser(email: string): Promise<User> {
    return await this.database.user.findUnique({ where: { email } });
  }
  async getUserToken(email: string) {
    return await this.database.user.findUnique({
      where: { email },
      include: { UserToken: { select: { hashedToken: true } } },
    });
  }
  @OnEvent('token.update', { async: true })
  async updateUserRt(userId: string, refresh_token: string) {
    return this.database.userToken.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        hashedToken: refresh_token,
      },
      update: {
        hashedToken: refresh_token,
      },
    });
  }

  async logout(email: string): Promise<void> {
    await this.database.user.update({
      where: { email },
      data: { UserToken: { update: { hashedToken: '' } } },
    });
  }
}
