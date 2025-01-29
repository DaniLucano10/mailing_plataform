import { IsOptional, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;
    
}
