import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { TransformInterceptor } from './utils/transform.interceptor.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });

  app.use(cookieParser('secret-cookie'));

  app.set('views', import.meta.dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT') ?? 3000);
}
await bootstrap();
