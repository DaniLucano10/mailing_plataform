import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    name?: string;
  
    @IsOptional() 
    @IsString()
    status?: string;
  
    
    @IsOptional()
    @IsInt() // Validar que sea un número entero
    @Transform(({ value }) => parseInt(value) || 0)
    user_id?: number;
}
