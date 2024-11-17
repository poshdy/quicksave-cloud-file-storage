import { Injectable, NotFoundException } from '@nestjs/common';
import { IFileSerive } from '../interfaces/file.service.interface';
import { CurrentUser } from 'src/core/users/types/user.types';
import { FileParams, FileQuery, UploadedFile } from '../types/file.types';
import {
  SendPreviewMailPayload,
  StarObject,
  UpdateFileNamePayload,
} from '../dtos/file.dto';
import { FileRepo } from '../repositories/file.repo';
import { StorageService } from 'src/storage/storage.service';
import { File } from '@prisma/client';
import { Response } from 'express';
import { FileServiceHelper } from './file.service.helper';

@Injectable()
export class FileService implements IFileSerive {
  constructor(
    private readonly fileHelper: FileServiceHelper,
    private readonly fileRepo: FileRepo,
    private readonly storage: StorageService,
  ) {}
  async upload(user: CurrentUser, files: Express.Multer.File[]): Promise<void> {
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      const data = {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        objectName: this.fileHelper.generateUniqueObjectName(),
      } satisfies UploadedFile;
      await this.storage.upload(file, data.objectName);

      await this.fileRepo.save(user, data);
    }
  }
  async getFiles(user: CurrentUser, query: FileQuery): Promise<File[]> {
    return await this.fileRepo.getAll(user, query);
  }
  async download(
    stream: Response,
    user: CurrentUser,
    params: FileParams,
  ): Promise<any> {
    return await this.storage.download(stream, params.objectName);
  }
  async getFile(user: CurrentUser, params: FileParams): Promise<File> {
    return await this.fileRepo.getOne(user, params.objectName);
  }
  async getPreview(user: CurrentUser, params: FileParams): Promise<any> {
    const file = await this.fileRepo.getOne(user, params.objectName);

    return await this.storage.genearateSignedUrl(file?.objectName);
  }

  async updateFile(
    user: CurrentUser,
    params: FileParams,
    data: UpdateFileNamePayload,
  ): Promise<File> {
    return await this.fileRepo.update(user, params.objectName, data.name);
  }

  async sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any> {}

  async starObject(
    user: CurrentUser,
    params: FileParams,
    body: StarObject,
  ): Promise<File> {
    return await this.fileRepo.starObject(user, params, body);
  }
  // on file dec quota!
  async deleteFile(user: CurrentUser, params: FileParams): Promise<any> {
    const file = await this.fileRepo.getOne(user, params.objectName);
    await this.storage.delete(file.objectName);
    await this.fileRepo.delete(user, params.objectName);
  }
}
