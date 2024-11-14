import { User } from '@prisma/client';

export type Message = Record<string, string>;

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type UserPayload = {
  id: string;
  email: string;
};

export type UserReturnType = Omit<User, 'hashedPassword' | 'updatedAt'>;

export type UserReturnTypeWithTokens = Omit<
  User,
  'hashedPassword' | 'updatedAt'
> &
  Tokens;

export type GoogleUserPayload = {
  email: string;
  name: string;
};

export type AccessToken = Omit<Tokens, 'refresh_token'>;
