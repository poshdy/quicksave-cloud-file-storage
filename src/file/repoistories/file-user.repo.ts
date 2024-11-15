import { Injectable } from '@nestjs/common';
import { IFileUserRepoistory } from '../interfaces/file.repo.interface';
import { DatabaseService } from 'src/core/database/database.service';
import { CurrentUser } from 'src/core/users/types/user.types';
import { UserQuota } from '@prisma/client';

@Injectable()
export class FileUserRepo implements IFileUserRepoistory {
  constructor(private readonly database: DatabaseService) {}
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
