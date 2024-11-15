import { CurrentUser } from 'src/core/users/types/user.types';
import { FileQuery, UploadedFile } from '../types/file.types';

export interface IFileRepoistory {
  getOne(user: CurrentUser, objectName: string): Promise<any>;
  getAll(user: CurrentUser, query: FileQuery): Promise<any[]>;
  update(user: CurrentUser, objectName: string, name: string): Promise<any>;
  delete(user: CurrentUser, objectName: string): Promise<void>;
  save(user: CurrentUser, file: UploadedFile): Promise<any>;
}

export interface IFileUserRepoistory {
  increaseQuota(user: CurrentUser, size: number): Promise<any>;
  decreaseQuota(user: CurrentUser, size: number): Promise<any>;
}
