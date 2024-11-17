import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FileServiceHelper } from '../services/file.service.helper';

@Injectable()
export class IsOwner implements CanActivate {
  constructor(private readonly fileServiceHelper: FileServiceHelper) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    const objectName = request.params.objectName;
    const file = await this.fileServiceHelper.IsFileOwner(objectName);

    if (user.id === file.userId) {
      return true;
    }
    return false;
  }
}
