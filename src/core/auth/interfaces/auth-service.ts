import {
  GoogleUserPayload,
  Message,
  Tokens,
  UserPayload,
  UserReturnTypeWithTokens,
} from '../types/auth.types';
import { Request, Response } from 'express';
export interface IAuthServiceController {
  createAccount(data: GoogleUserPayload): Promise<UserReturnTypeWithTokens>;
  sendMagicLink(req: Request, res: Response, email: string): Promise<Message>;
  logout(email: string): Promise<void>;
  verify(email: string): Promise<UserReturnTypeWithTokens>;
  refresh(email: string, rt: string): Promise<Tokens>;
}
export interface IAuthServiceHelpers {
  hashData(data: string): Promise<string>;
  generateTokens(user: UserPayload): Promise<Tokens>;
  compareHash(data: string, hash: string): Promise<boolean>;
}

export interface IAuthService
  extends IAuthServiceController,
    IAuthServiceHelpers {}
