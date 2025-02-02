import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
  ) {}

  // Crear un nuevo suscriptor
  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const subscriber = this.subscribersRepository.create({
      ...createSubscriberDto,
      user_id: createSubscriberDto.user_id || null, // Asigna null si no se proporciona
    });

    return this.subscribersRepository.save(subscriber);
  }

  // Obtener todos los suscriptores
  async findAll(): Promise<Subscriber[] | string> {
    const subscriber = await this.subscribersRepository.find();
    if (subscriber.length === 0) {
      return 'No hay suscriptores registrados';
    }
    return subscriber;
  }
  async findOne(id: number) {
    return this.subscribersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByStatus(status: string) {
    return this.subscribersRepository.find({
      where: { status },
      relations: ['user'],
    });
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber> {
    try {
      // Buscar el suscriptor por ID y lanzar una excepción si no existe
      const existingSubscriber = await this.subscribersRepository.findOneOrFail({ where: { id } });
  
      // Validar el estado (status) si se proporciona
      if (updateSubscriberDto.status && !['active', 'inactive', 'pending'].includes(updateSubscriberDto.status)) {
        throw new BadRequestException('El estado proporcionado no es válido');
      }
  
      // Actualizar el suscriptor
      await this.subscribersRepository.update(id, updateSubscriberDto);
  
      // Devolver el suscriptor actualizado
      return this.subscribersRepository.findOneOrFail({ where: { id }, relations: ['user'] });
    } catch (error) {
      // Capturar errores específicos de TypeORM
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(`El suscriptor con ID ${id} no existe`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    // Verificar si el suscriptor existe
    const existingSubscriber = await this.subscribersRepository.findOne({
      where: { id },
    });
    if (!existingSubscriber) {
      throw new NotFoundException(`El suscriptor con ID ${id} no existe`);
    }

    // Eliminar el suscriptor
    await this.subscribersRepository.delete(id);
  }
}
