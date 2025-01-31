import { IsEmail, IsString } from 'class-validator';

export class LogoutDto {
  @IsString()
  email: string;

  @IsString()
  access_token: string;
}
