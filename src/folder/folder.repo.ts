import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { IFolderRepository } from './interfaces';
import { Folder } from '@prisma/client';
import { CreateFolderPayload } from './dtos/create-folder.dto';
import { RenameFolderPayload } from './dtos/update-folder.dto';

@Injectable()
export class FolderRepo implements IFolderRepository {
  constructor(private readonly database: DatabaseService) {}
  async create(data: CreateFolderPayload, userId: string): Promise<Folder> {
    return await this.database.folder.create({
      data: { name: data.name, userId },
    });
  }
  async getAll(userId: string): Promise<Folder[]> {
    return await this.database.folder.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
  async getOne(folderId: string, userId: string): Promise<Folder> {
    const folder = await this.database.folder.findUnique({
      where: { userId, id: folderId },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found!');
    }

    return folder;
  }

  async update(
    data: RenameFolderPayload,
    folderId: string,
    userId: string,
  ): Promise<Folder> {
    const folder = await this.getOne(folderId, userId);

    return await this.database.folder.update({
      where: { id: folder.id, userId: folder.userId },
      data,
    });
  }
  async delete(folderId: string, userId: string): Promise<void> {
    const folder = await this.getOne(folderId, userId);

    await this.database.folder.delete({
      where: { id: folder.id, userId: folder.userId },
    });
  }

  async isFolderOwner(folderId: string): Promise<Folder> {
    return await this.database.folder.findUnique({ where: { id: folderId } });
  }
}
