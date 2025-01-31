import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
