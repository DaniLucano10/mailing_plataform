import { IsEmail, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsEmail()
    email: string;
  
    @IsString()
    first_name: string;
  
    @IsString()
    last_name: string;
  
    @IsOptional()
    @IsIn(['active', 'inactive', 'pending', 'banned'])
    status?: string;

    @IsInt()
    user_id?: number;
}
