import { Injectable } from '@nestjs/common';
import { IFileRepository } from '../interfaces/file.repo.interface';
import { DatabaseService } from 'src/core/database/database.service';
import { CurrentUser } from 'src/core/users/types/user.types';
import { FileParams, FileQuery, UploadedFile } from '../types/file.types';
import { File } from '@prisma/client';
import { StarObject } from '../dtos/file.dto';

@Injectable()
export class FileRepo implements IFileRepository {
  constructor(private readonly database: DatabaseService) {}
  async save(user: CurrentUser, file: UploadedFile): Promise<File> {
    return await this.database.file.create({
      data: {
        userId: user.id,
        size: file.size,
        objectName: file.objectName,
        type: file.type,
      },
    });
  }

  async getAll(user: CurrentUser, query: FileQuery): Promise<File[]> {
    return await this.database.file.findMany({ where: { userId: user.id } });
  }
  async getOne(user: CurrentUser, objectName: string): Promise<File> {
    return await this.database.file.findUnique({
      where: { userId: user.id, objectName },
    });
  }
  async update(
    user: CurrentUser,
    objectName: string,
    name: string,
  ): Promise<File> {
    return await this.database.file.update({
      data: { name },
      where: { objectName, userId: user.id },
    });
  }
  async delete(user: CurrentUser, objectName: string): Promise<any> {
    return await this.database.file.delete({
      where: { objectName, userId: user.id },
    });
  }

  async starObject(
    user: CurrentUser,
    params: FileParams,
    body: StarObject,
  ): Promise<File> {
    const file = await this.database.file.update({
      where: { objectName: params.objectName, user: { email: user.email } },
      data: { isStared: body.isStared },
    });

    return file;
  }
  async getFileByName(objectName: string): Promise<File> {
    return await this.database.file.findUnique({ where: { objectName } });
  }
}
