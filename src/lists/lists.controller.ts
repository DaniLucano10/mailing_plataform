import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  async create(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listsService.create(createListDto);
  }

  @Get()
  async findAll(): Promise<List[]> {
    return this.listsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<List> {
    return this.listsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateListDto: CreateListDto,
  ): Promise<List> {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.listsService.remove(id);
  }
}
