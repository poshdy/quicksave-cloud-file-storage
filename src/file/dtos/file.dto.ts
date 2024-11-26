import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendPreviewMailPayload {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value == null && '2')
  duration: string;
}

export class UpdateFileNamePayload {
  @IsString()
  name: string;
}

export class StarObject {
  @IsBoolean()
  isStared: boolean;
}
