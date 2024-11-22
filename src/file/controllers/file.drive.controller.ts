import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/core/auth/guards/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('files/drive')
export class DriveController {
  @Get('/access')
  getAccess() {}
}
