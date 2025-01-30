import { Injectable } from '@nestjs/common';
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
        user_id: createSubscriberDto.user_id || null,  // Asigna null si no se proporciona
      });
    
      return this.subscribersRepository.save(subscriber);
    }
    

  // Obtener todos los suscriptores
  async findAll(): Promise<Subscriber[]> {
    return this.subscribersRepository.find();
  }
  async findOne(id: number) {
    return this.subscribersRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async findByStatus(status: string) {
    return this.subscribersRepository.find({ where: { status }, relations: ['user'] });
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    await this.subscribersRepository.update(id, updateSubscriberDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.subscribersRepository.delete(id);
  }
}
