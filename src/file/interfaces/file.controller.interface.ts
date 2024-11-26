import { CurrentUser } from 'src/core/users/types/user.types';
import {
  SendPreviewMailPayload,
  StarObject,
  UpdateFileNamePayload,
} from '../dtos/file.dto';
import { FileParams, FileQuery } from '../types/file.types';
import { Message } from 'src/core/auth/types/auth.types';
import { Response } from 'express';
import { File } from '@prisma/client';

export interface IFileController {
  upload(user: CurrentUser, files: Express.Multer.File[]): Promise<Message>;
  download(
    response: Response,
    user: CurrentUser,
    params: FileParams,
  ): Promise<any>;

  updateFile(
    body: UpdateFileNamePayload,
    user: CurrentUser,
    params: FileParams,
  ): Promise<File>;

  starObject(
    user: CurrentUser,
    params: FileParams,
    body: StarObject,
  ): Promise<File>;
  getFile(user: CurrentUser, params: FileParams): Promise<any>;
  getFiles(user: CurrentUser, query: FileQuery): Promise<any[]>;
  getPreviewLink(user: CurrentUser, params: FileParams): Promise<string>;
  sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any>;

  deleteFile(user: CurrentUser, params: FileParams): Promise<Message>;
}
