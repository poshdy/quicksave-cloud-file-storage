import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './services/file.service';
import { AuthenticationGuard } from 'src/core/auth/guards/authentication.guard';
import { IFileController } from './interfaces/file.controller.interface';
import { CurrentUser } from 'src/core/users/types/user.types';
import { FileParams, FileQuery } from './types/file.types';
import {
  SendPreviewMailPayload,
  StarObject,
  UpdateFileNamePayload,
} from './dtos/file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Message } from 'src/core/auth/types/auth.types';
import { File } from '@prisma/client';
import { Response } from 'express';
import { IsOwner } from './guards/is-owner.guard';

@UseGuards(AuthenticationGuard)
@Controller('files')
export class FileController implements IFileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('/upload')
  async upload(
    @GetCurrentUser() user: CurrentUser,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Message> {
    await this.fileService.upload(user, files);

    return { message: 'file uploaded successfully!' };
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getFiles(
    user: CurrentUser,
    @Query() query: FileQuery,
  ): Promise<File[]> {
    return await this.fileService.getFiles(user, query);
  }

  @UseGuards(IsOwner)
  @Get(':objectName/download')
  async download(
    @Res() response: Response,
    user: CurrentUser,
    @Query() params: FileParams,
  ): Promise<any> {
    const file = await this.fileService.getFile(user, params);
    const stream = response.writeHead(200, {
      'content-Type': file.type,
      'content-Disposition': `attachment; filename=${file.name}`,
    });
    await this.fileService.download(stream, user, params);
    return { message: `${file.name} downloaded successfully` };
  }

  @UseGuards(IsOwner)
  @HttpCode(HttpStatus.OK)
  @Get(':objectName/preview')
  async getPreview(
    user: CurrentUser,
    @Query() params: FileParams,
  ): Promise<any> {
    return await this.fileService.getPreview(user, params);
  }

  @UseGuards(IsOwner)
  @HttpCode(HttpStatus.OK)
  @Patch(':objectName/star')
  async starObject(
    @GetCurrentUser() user: CurrentUser,
    @Param() params: FileParams,
    @Body() body: StarObject,
  ): Promise<File> {
    return await this.fileService.starObject(user, params, body);
  }

  @UseGuards(IsOwner)
  @HttpCode(HttpStatus.OK)
  @Get(':objectName')
  async getFile(user: CurrentUser, @Param() params: FileParams): Promise<File> {
    return await this.fileService.getFile(user, params);
  }

  @UseGuards(IsOwner)
  @HttpCode(HttpStatus.OK)
  @Patch(':objectName')
  async updateFile(
    @Body() body: UpdateFileNamePayload,
    @GetCurrentUser() user: CurrentUser,
    @Param() params: FileParams,
  ): Promise<File> {
    return await this.fileService.updateFile(user, params, body);
  }

  @UseGuards(IsOwner)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':objectName')
  async deleteFile(
    @GetCurrentUser() user: CurrentUser,
    params: FileParams,
  ): Promise<Message> {
    await this.fileService.deleteFile(user, params);
    return { message: 'file deleted successfully!' };
  }
  async sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any> {}
}
