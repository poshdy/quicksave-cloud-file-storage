import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
// import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_REDIRECT_URI'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const user = {
      email: profile?._json.email,
      name: profile?.displayName,
    };

    // auth service that register the user and generate tokens
    const newUser = await this.authService.createAccount({
      email: user.email,
      name: user.name,
    });
    done(null, newUser);
  }
}
