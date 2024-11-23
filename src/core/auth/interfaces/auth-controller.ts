import { Request, Response } from 'express';
import { LoginPayload } from '../dtos/auth-dto';
import { Message, Tokens, UserReturnTypeWithTokens } from '../types/auth.types';

export interface IAuthController {
  googleRegister(): Promise<Message>;
  googleCallback(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response, body: LoginPayload): Promise<Message>;
  verify(user: { email: string }, res: Response): Promise<void>;
  refresh(
    user: { email: string; refresh_token: string },
    res: Response,
  ): Promise<void>;
  logout(user: { email: string }): Promise<Message>;
}
