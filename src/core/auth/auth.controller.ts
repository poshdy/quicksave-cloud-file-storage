import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { IAuthController } from './interfaces/auth-controller';
import { Message, Tokens } from './types/auth.types';
import { Request, Response } from 'express';
import { GoogleGuard } from './guards/google.guard';
import { LoginPayload } from './dtos/auth-dto';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { MagicLinkGuard } from './guards/magic_link.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AuthenticationGuard } from './guards/authentication.guard';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/google/register')
  async googleRegister(): Promise<Message> {
    return {
      message: 'redirecting to google',
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleGuard)
  @Get('/google/callback')
  async googleCallback(@Req() req: Request) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginPayload,
  ): Promise<Message> {
    const data = await this.authService.sendMagicLink(
      req,
      res,
      body.destination,
    );
    return data;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(MagicLinkGuard)
  @Get('/login/callback')
  async verify(
    @GetCurrentUser() user: { email: string },
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.authService.verify(user.email);

    res.cookie('quicksaveToken', data.refresh_token, {
      httpOnly: true,
      path: '/',
      domain: 'localhost',
      maxAge: 259200000,
    });
    res.send({
      id: data.id,
      name: data.name,
      email: data.email,
      access_token: data.access_token,
    });
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/refresh')
  async refresh(
    @GetCurrentUser() user: { email: string; refresh_token: string },
  ): Promise<Tokens> {
    const data = await this.authService.refresh(user.email, user.refresh_token);
    return data;
  }

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/logout')
  async logout(@GetCurrentUser() user: { email: string }): Promise<Message> {
    await this.authService.logout(user.email);
    return { message: 'Logged out successfully!' };
  }
}
