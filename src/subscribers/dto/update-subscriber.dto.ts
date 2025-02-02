import { PartialType } from '@nestjs/swagger';
import { CreateSubscriberDto } from './create-subscriber.dto';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateSubscriberDto extends PartialType(CreateSubscriberDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  @IsIn(['activo', 'inactivo', 'pendiente', 'desuscrito'], { message: 'El estado proporcionado no es válido' })
  status?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del usuario debe ser un número entero' })
  user_id?: number | null;
}
