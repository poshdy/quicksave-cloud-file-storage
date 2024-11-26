import { IsString } from 'class-validator';

export class CreateFolderPayload {
  @IsString()
  name: string;
}
