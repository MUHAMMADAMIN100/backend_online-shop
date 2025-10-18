import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as express from 'express';

// Функция для создания NestJS-приложения
export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  return app;
}

// Если запускаем локально (не Vercel) — поднимаем сервер
if (process.env.NODE_ENV !== 'production') {
  createApp().then(async (app) => {
    await app.listen(3001, '0.0.0.0');
    console.log('✅ Server running on http://localhost:3001');
  });
}
