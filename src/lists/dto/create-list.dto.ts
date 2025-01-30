import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  // Este DTO debe recibir un user_id cuando crees la lista
  @IsInt()
  user_id: number;
}
