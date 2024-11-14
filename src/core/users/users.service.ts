import { Injectable } from '@nestjs/common';
import { UserAuthRepo } from './repoistories/users.auth.repo';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserAuthRepo) {}
  async getUserByEmail(email: string) {
    return await this.userRepo.getUser(email);
  }
}
