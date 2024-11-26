import { Folder } from '@prisma/client';
import { CreateFolderPayload } from '../dtos/create-folder.dto';
import { CurrentUser } from 'src/core/users/types/user.types';
import { RenameFolderPayload } from '../dtos/update-folder.dto';
import { FolderParams } from '../types';

export interface IFolderController {
  create(body: CreateFolderPayload, user: CurrentUser): Promise<Folder>;

  getAll(user: CurrentUser): Promise<Folder[]>;
  getOne(folderId: FolderParams, user: CurrentUser): Promise<Folder>;
  updateFolder(
    body: RenameFolderPayload,
    folderId: FolderParams,
    user: CurrentUser,
  ): Promise<Folder>;

  deleteFolder(folderId: FolderParams, user: CurrentUser): Promise<void>;
}

export interface IFolderService {
  create(data: CreateFolderPayload, userId: string): Promise<Folder>;
  getAll(userId: string): Promise<Folder[]>;
  getOne(folderId: string, userId: string): Promise<Folder>;
  update(
    data: RenameFolderPayload,
    folderId: string,
    userId: string,
  ): Promise<Folder>;
  delete(folderId: string, userId: string): Promise<void>;

  isFolderOwner(folderId: string): Promise<Folder>;
}

export interface IFolderRepository extends IFolderService {}
