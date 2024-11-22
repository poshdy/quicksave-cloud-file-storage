import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class DriveService {
  constructor(private readonly configService: ConfigService) {}
  private readonly googleAuth = new google.auth.OAuth2({
    clientId: this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
    clientSecret: this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
    redirectUri: '',
  });

  async getAccess() {
    await this.googleAuth.setCredentials(this.googleAuth.credentials);

    google.drive({ version: 'v2', auth: this.googleAuth });
  }
}
