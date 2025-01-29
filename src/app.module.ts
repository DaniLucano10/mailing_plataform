import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/entities/list.entity';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  
      port: 5432,         
      username: 'postgres', 
      password: '123456',  
      database: 'mailing_platform',  
      entities: [User, List], 
      synchronize: true, 
    }),
    AuthModule,
    ListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
