import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async create(@Body() createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    return this.subscriberSService.create(createSubscriberDto);
  }
  @Get()
  findAll() {
    return this.subscriberSService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSubscriberDto: UpdateSubscriberDto) {
    return this.subscriberSService.update(id, updateSubscriberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.subscriberSService.remove(id);
  }
}
