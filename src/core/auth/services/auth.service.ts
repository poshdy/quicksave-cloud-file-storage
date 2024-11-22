import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthServiceController } from '../interfaces/auth-service';
import { AuthHelpers } from './auth.helpers.service';
import { UserAuthRepo } from 'src/core/users/repoistories/users.auth.repo';
import {
  GoogleUserPayload,
  Message,
  Tokens,
  UserReturnTypeWithTokens,
} from '../types/auth.types';
import { MagicLinkStrategy } from '../strategies/magic_link.strategy';
import { Request, Response } from 'express';

@Injectable()
export class AuthService implements IAuthServiceController {
  constructor(
    private readonly authHelperService: AuthHelpers,
    private readonly userAuthRepo: UserAuthRepo,
    private readonly magic: MagicLinkStrategy,
  ) {}
  async createAccount(
    data: GoogleUserPayload,
  ): Promise<UserReturnTypeWithTokens> {
    const isExists = await this.userAuthRepo.getUser(data.email);

    if (isExists) {
      throw new ConflictException('this email is already exists');
    }
    const newUser = await this.userAuthRepo.createUser({
      email: data.email,
      name: data.name,
    });

    const { access_token, refresh_token } =
      await this.authHelperService.generateTokens({
        id: newUser.id,
        email: newUser.email,
      });
    await this.authHelperService.updateRt(newUser.id, refresh_token);

    return {
      ...newUser,
      access_token,
      refresh_token,
    };
  }
  async sendMagicLink(
    req: Request,
    res: Response,
    email: string,
  ): Promise<Message> {
    console.log(email);
    const user = await this.userAuthRepo.getUser(email);
    if (!user) {
      throw new NotFoundException('this user is not found');
    }
    const data = await this.magic.send(req, res);
    return { message: 'Check your email!' };
  }
  async verify(email: string): Promise<UserReturnTypeWithTokens> {
    console.log(email, 'verify');

    const user = await this.userAuthRepo.getUser(email);
    const { access_token, refresh_token } =
      await this.authHelperService.generateTokens({
        id: user.id,
        email: user.email,
      });
    await this.authHelperService.updateRt(user.id, refresh_token);
    return {
      ...user,
      access_token,
      refresh_token,
    };
  }
  async logout(email: string): Promise<void> {
    await this.userAuthRepo.logout(email);
  }
  async refresh(email: string, rt: string): Promise<Tokens> {
    const user = await this.userAuthRepo.getUser(email);
    if (!user) {
      throw new NotFoundException();
    }
    // check if this token belongs to the user
    const userToken = await this.userAuthRepo.getUserToken(email);
    const isBelongTo = this.authHelperService.compareHash(
      rt,
      userToken.UserToken.hashedToken,
    );

    if (!isBelongTo) {
      throw new UnauthorizedException('access denied!');
    }
    // generate new tokens for the user
    const { access_token, refresh_token } =
      await this.authHelperService.generateTokens({
        id: user.id,
        email: user.email,
      });

    // update the stored hashed refresh_token
    await this.authHelperService.updateRt(user.id, rt);
    // return tokens

    return { access_token, refresh_token };
  }
}
