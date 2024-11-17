import { CurrentUser } from 'src/core/users/types/user.types';
import { FileParams, FileQuery, UploadedFile } from '../types/file.types';
import { File } from '@prisma/client';
import { StarObject } from '../dtos/file.dto';

export interface IFileRepository {
  getOne(user: CurrentUser, objectName: string): Promise<File>;
  getFileByName(objectName: string): Promise<File>;
  getAll(user: CurrentUser, query: FileQuery): Promise<File[]>;
  update(user: CurrentUser, objectName: string, name: string): Promise<File>;
  delete(user: CurrentUser, objectName: string): Promise<void>;
  save(user: CurrentUser, file: UploadedFile): Promise<File>;
  starObject(
    user: CurrentUser,
    params: FileParams,
    body: StarObject,
  ): Promise<File>;
}

export interface IFileUserRepository {
  increaseQuota(user: CurrentUser, size: number): Promise<any>;
  decreaseQuota(user: CurrentUser, size: number): Promise<any>;
}
