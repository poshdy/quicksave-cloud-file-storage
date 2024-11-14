import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginPayload {
  @IsEmail()
  destination: string;
}
