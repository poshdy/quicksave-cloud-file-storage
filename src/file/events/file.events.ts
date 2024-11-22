import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CurrentUser } from 'src/core/users/types/user.types';
import { FileUserRepo } from '../repositories/file-user.repo';

@Injectable()
export class FileEvents {
  constructor(private readonly userFileRepo: FileUserRepo) {}
  @OnEvent('file.upload')
  onUpload() {}

  @OnEvent('file.uploaded', { async: true })
  async afterUpload(user: CurrentUser, size: number) {
    console.log('emitted');
    return await this.userFileRepo.increaseQuota(user, size);
  }
  @OnEvent('file.delete')
  onDelete() {}
}

// on upload

//// check if user quota
// after upload
//// add file size to user qouta
// after delete
//// dec the quota by file size
