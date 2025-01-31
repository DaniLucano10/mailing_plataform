import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
