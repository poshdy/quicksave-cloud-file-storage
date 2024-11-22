import {
  BadRequestException,
  CallHandler,
  CanActivate,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FileUserRepo } from '../repositories/file-user.repo';
import { Request } from 'express';
import { CurrentUser } from 'src/core/users/types/user.types';
import { Observable } from 'rxjs';

@Injectable()
export class CanUpload implements NestInterceptor {
  private readonly STANDARD_PLAN_QUOTA = 150000000;
  constructor(private readonly userFileRepo: FileUserRepo) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();

    const files = request?.files;

    console.log(files);
    const file = files[0];
    const user = await this.userFileRepo.getUserQuota(
      request?.user as CurrentUser,
    );

    const canUpload =
      user.usedQuota < this.STANDARD_PLAN_QUOTA &&
      file.size + user.usedQuota < this.STANDARD_PLAN_QUOTA;

    if (!canUpload) {
      throw new BadRequestException(
        "you can't upload this file you have exceeded your free quota",
      );
    }
    return next.handle();
  }
}
