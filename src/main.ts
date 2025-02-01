import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para registrar todas las solicitudes entrantes
  app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    console.log('Cuerpo de la solicitud:', req.body);
    next();
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Agregar formato JWT para que Swagger reconozca bien el token
      },
      'JWT-auth', // Nombre de la autorización, debe coincidir con @ApiBearerAuth()
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    origin: ['https://sapbootcamp.its.institute', 'http://localhost:5173'], // Permite el frontend en desarrollo
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Habilita cookies o autenticación con credenciales
  });

  // Usar body-parser para manejar datos en formato x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  const port = process.env.NEST_PORT || 3000;
  await app.listen(port);
}
bootstrap();
