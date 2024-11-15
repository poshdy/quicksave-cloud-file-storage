import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendPreviewMailPayload {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value == null && '2')
  duration: string;
}
