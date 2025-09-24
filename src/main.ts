import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(new Reflector()));

   // Разрешаем все CORS-запросы (для разработки)
  app.enableCors({
    origin: '*', // разрешить все источники
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // если нужно использовать куки
  });

  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
}
bootstrap();
