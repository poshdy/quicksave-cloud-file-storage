import { Injectable, NotFoundException } from '@nestjs/common';
import { IFolderService } from './interfaces';
import { Folder } from '@prisma/client';
import { CurrentUser } from 'src/core/users/types/user.types';
import { CreateFolderPayload } from './dtos/create-folder.dto';
import { RenameFolderPayload } from './dtos/update-folder.dto';
import { FolderRepo } from './folder.repo';

@Injectable()
export class FolderService implements IFolderService {
  constructor(private readonly folderRepo: FolderRepo) {}

  async create(data: CreateFolderPayload, userId: string): Promise<Folder> {
    return await this.folderRepo.create(data, userId);
  }
  async getAll(userId: string): Promise<Folder[]> {
    return await this.folderRepo.getAll(userId);
  }
  async getOne(folderId: string, userId: string): Promise<Folder> {
    return await this.folderRepo.getOne(folderId, userId);
  }
  async update(
    data: RenameFolderPayload,
    folderId: string,
    userId: string,
  ): Promise<Folder> {
    return await this.folderRepo.update(data, folderId, userId);
  }
  async delete(folderId: string, userId: string): Promise<void> {
    await this.folderRepo.delete(folderId, userId);
  }

  async isFolderOwner(folderId: string) {
    const folder = await this.folderRepo.isFolderOwner(folderId);

    if (!folder) {
      throw new NotFoundException('Folder not found!');
    }

    return folder;
  }
}
