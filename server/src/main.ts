import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuration de swagger

  const config = new DocumentBuilder().setTitle('VOWD').setDescription("Api pour l'agence VOWD.fr").setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  // app.setGlobalPrefix("api");
  app.enableCors({
    origin: 'https://www.mutuact.fr', // Remplacez par votre origine
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const PORT = configService.get<number>('PORT') || 9000;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);

  console.log(`Server is running on PORT ${PORT}`);
}
bootstrap();
