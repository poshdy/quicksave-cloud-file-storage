import { CurrentUser } from 'src/core/users/types/user.types';
import { SendPreviewMailPayload } from '../dtos/file.dto';
import { FileParams, FileQuery } from '../types/file.types';
import { Message } from 'src/core/auth/types/auth.types';
import { Response } from 'express';

export interface IFileController {
  upload(user: CurrentUser, files: Express.Multer.File[]): Promise<Message>;
  download(
    response: Response,
    user: CurrentUser,
    params: FileParams,
  ): Promise<any>;

  getFile(user: CurrentUser, params: FileParams): Promise<any>;
  getFiles(user: CurrentUser, query: FileQuery): Promise<any[]>;
  getPreview(user: CurrentUser, params: FileParams): Promise<any>;
  sendPreviewLink(
    user: CurrentUser,
    params: FileParams,
    body: SendPreviewMailPayload,
  ): Promise<any>;
}
