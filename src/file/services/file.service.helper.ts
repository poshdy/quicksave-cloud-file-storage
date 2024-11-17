import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { File } from '@prisma/client';
import { FileRepo } from '../repositories/file.repo';

@Injectable()
export class FileServiceHelper {
  constructor(private readonly fileRepo: FileRepo) {}
  generateUniqueObjectName(bytes: number = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  async IsFileOwner(objectName: string): Promise<File> {
    const file = await this.fileRepo.getFileByName(objectName);

    if (!file) {
      throw new NotFoundException('file not found');
    }

    return file;
  }
}
