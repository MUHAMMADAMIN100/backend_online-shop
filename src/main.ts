import { join } from "path"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

   
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  
  


  await app.listen(3001,'0.0.0.0');
  console.log('Server running on http://localhost:3001');
}
bootstrap();
