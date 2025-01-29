import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  // Crear una nueva lista
  async create(createListDto: CreateListDto): Promise<List> {
    const list = this.listsRepository.create(createListDto);
    return await this.listsRepository.save(list);
  }

   // Método para obtener todas las listas
   async findAll(): Promise<List[]> {
    return this.listsRepository.find({
      relations: ['user'], // Si quieres obtener el usuario completo
    });
   }
  // Obtener una lista por ID
  async findOne(id: number): Promise<List> {
    const list = await this.listsRepository.findOne({
      where: { id },  // Aquí usamos un objeto con la propiedad "where"
    });
    
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    return list;
  }


  // Actualizar una lista
  async update(id: number, updateListDto: CreateListDto): Promise<List> {
    await this.listsRepository.update(id, updateListDto);
    return this.findOne(id);  // Llamamos a findOne para asegurarnos de que la lista se ha actualizado correctamente
  }

  // Eliminar una lista
  async remove(id: number): Promise<void> {
    await this.listsRepository.delete(id);
  }
}
