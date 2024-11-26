import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderPayload } from './create-folder.dto';

export class RenameFolderPayload extends PartialType(CreateFolderPayload) {}
