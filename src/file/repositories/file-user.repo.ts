import { Injectable } from '@nestjs/common';
import { IFileUserRepository } from '../interfaces/file.repo.interface';
import { DatabaseService } from 'src/core/database/database.service';
import { CurrentUser } from 'src/core/users/types/user.types';
import { UserQuota } from '@prisma/client';

@Injectable()
export class FileUserRepo implements IFileUserRepository {
  constructor(private readonly database: DatabaseService) {}
  async getUserQuota(user: CurrentUser): Promise<UserQuota> {
    const userQuota = await this.database.userQuota.findUnique({
      where: { userId: user.id },
    });
    if (userQuota) {
      return await this.database.userQuota.findUnique({
        where: {
          userId: user.id,
        },
      });
    } else {
      return await this.database.userQuota.create({
        data: {
          user: { connect: { id: user.id } },
          usedQuota: 0,
        },
      });
    }
  }

  async increaseQuota(user: CurrentUser, size: number): Promise<UserQuota> {
    return await this.database.userQuota.update({
      data: { usedQuota: { increment: size } },
      where: { userId: user.id },
    });
  }
  async decreaseQuota(user: CurrentUser, size: number): Promise<UserQuota> {
    return await this.database.userQuota.update({
      data: { usedQuota: { increment: size } },
      where: { userId: user.id },
    });
  }
}
