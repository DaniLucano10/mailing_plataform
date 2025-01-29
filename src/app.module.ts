import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',  // Cambia esto si tu base de datos está en otro servidor
      port: 5432,         // Puerto de PostgreSQL
      username: 'postgres', // Tu usuario de PostgreSQL
      password: '123456',  // Tu contraseña de PostgreSQL
      database: 'mailing_platform',  // Nombre de la base de datos
      entities: [User], // Asegúrate de que las entidades estén en el directorio correcto
      synchronize: true,  // Solo en desarrollo, en producción usar migraciones
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
