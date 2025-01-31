import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsString()
    email: string;
  
    @IsString()
    @IsOptional() 
    name?: string;
  
    @IsOptional() 
    @IsString()
    status?: string;
  
    @IsInt()
    user_id: number;;
}
