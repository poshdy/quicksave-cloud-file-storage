import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FolderService } from '../folder.service';

@Injectable()
export class IsFolderOwner implements CanActivate {
  constructor(private readonly folderService: FolderService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    const folderId = request.params.folderId;
    const file = await this.folderService.isFolderOwner(folderId);

    if (user.id === file.userId) {
      return true;
    }
    return false;
  }
}
