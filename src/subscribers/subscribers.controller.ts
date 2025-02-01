import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscriberSService: SubscribersService) {}

  @Post()
  async create(
    @Body() createSubscriberDto: CreateSubscriberDto,
  ): Promise<Subscriber> {
    console.log('Datos recibidos del formulario:', createSubscriberDto);

    // Validar que los datos mínimos estén presentes
    if (
      !createSubscriberDto.email ||
      !createSubscriberDto.name ||
      !createSubscriberDto.status
    ) {
      throw new BadRequestException(
        'Faltan campos obligatorios: email, name o status',
      );
    }

    // Asignar un valor predeterminado a user_id si no se proporciona
    if (!createSubscriberDto.user_id) {
      createSubscriberDto.user_id = 0; // Valor predeterminado
    }

    // Crear el suscriptor usando el servicio
    return this.subscriberSService.create(createSubscriberDto);
  }

  @Get()
  findAll() {
    return this.subscriberSService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    return this.subscriberSService.update(id, updateSubscriberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subscriberSService.remove(id);
  }
}
