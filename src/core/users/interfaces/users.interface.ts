import { User, UserToken } from '@prisma/client';
import {
  GoogleUserPayload,
  UserReturnType,
} from 'src/core/auth/types/auth.types';

export interface IUserAuthRepoistory {
  createUser(data: GoogleUserPayload): Promise<UserReturnType>;
  getUser(email: string): Promise<User>;
  updateUserRt(userId: string, refresh_token: string): Promise<UserToken>;
  logout(email: string): void;
}
