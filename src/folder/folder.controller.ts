import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { IFolderController } from './interfaces';
import { Folder } from '@prisma/client';
import { CurrentUser } from 'src/core/users/types/user.types';
import { CreateFolderPayload } from './dtos/create-folder.dto';
import { FolderParams } from './types';
import { RenameFolderPayload } from './dtos/update-folder.dto';
import { AuthenticationGuard } from 'src/core/auth/guards/authentication.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { GetFolderId } from './decorators/get-folder-id.decorator';
import { IsFolderOwner } from './guards/is-owner.guard';

@UseGuards(AuthenticationGuard)
@Controller('folders')
export class FolderController implements IFolderController {
  constructor(private readonly folderService: FolderService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() body: CreateFolderPayload,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<Folder> {
    return await this.folderService.create(body, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@GetCurrentUser() user: CurrentUser): Promise<Folder[]> {
    return await this.folderService.getAll(user?.id);
  }

  @UseGuards(IsFolderOwner)
  @HttpCode(HttpStatus.OK)
  @Get(':folderId')
  async getOne(
    @GetFolderId() params: FolderParams,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<Folder> {
    return await this.folderService.getOne(params.folderId, user.id);
  }

  @UseGuards(IsFolderOwner)
  @HttpCode(HttpStatus.OK)
  @Patch(':folderId')
  async updateFolder(
    @Body() body: RenameFolderPayload,
    @GetFolderId() params: FolderParams,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<Folder> {
    return await this.folderService.update(body, params.folderId, user.id);
  }

  @UseGuards(IsFolderOwner)
  @HttpCode(HttpStatus.OK)
  @Delete(':folderId')
  async deleteFolder(
    @GetFolderId() params: FolderParams,
    @GetCurrentUser() user: CurrentUser,
  ): Promise<void> {
    await this.folderService.delete(params.folderId, user.id);
  }
}
