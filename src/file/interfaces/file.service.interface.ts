import { CurrentUser } from 'src/core/users/types/user.types';
import { FileParams, FileQuery } from '../types/file.types';
import {
  SendPreviewMailPayload,
  StarObject,
  UpdateFileNamePayload,
} from '../dtos/file.dto';
import { Response } from 'express';
import { File } from '@prisma/client';

export interface IFileSerive {
  upload(user: CurrentUser, files: Express.Multer.File[]): Promise<void>;
  updateFile(
    user: CurrentUser,
    params: FileParams,
    data: UpdateFileNamePayload,
  ): Promise<File>;
  getFiles(user: CurrentUser, query: FileQuery): Promise<File[]>;
  download(
    stream: Response,
    user: CurrentUser,
    params: FileParams,
  ): Promise<any>;

  getFile(user: CurrentUser, params: FileParams): Promise<File>;
  getPreviewLink(user: CurrentUser, params: FileParams): Promise<string>;
  sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any>;

  deleteFile(user: CurrentUser, params: FileParams): Promise<void>;
  starObject(
    user: CurrentUser,
    params: FileParams,
    body: StarObject,
  ): Promise<File>;
}
