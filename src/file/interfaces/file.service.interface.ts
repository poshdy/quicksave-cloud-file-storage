import { CurrentUser } from 'src/core/users/types/user.types';
import { IFileController } from './file.controller.interface';
import { FileParams, FileQuery } from '../types/file.types';
import { SendPreviewMailPayload } from '../dtos/file.dto';
import { Response } from 'express';

export interface IFileSerive {
  upload(user: CurrentUser, files: Express.Multer.File[]): Promise<any>;
  getFiles(user: CurrentUser, query: FileQuery): Promise<any[]>;
  download(
    stream: Response,
    user: CurrentUser,
    params: FileParams,
  ): Promise<any>;
  getFile(user: CurrentUser, params: FileParams): Promise<any>;
  getPreview(user: CurrentUser, params: FileParams): Promise<any>;
  sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any>;
}
