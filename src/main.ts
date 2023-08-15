import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Transport } from '@nestjs/microservices';

import env from './env';

async function bootstrap() {
  const { port } = env;

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  app.use(helmet());

  if (process.env.REDIS_URL) {
    app.connectMicroservice({
      transport: Transport.REDIS,
      options: {
        url: process.env.REDIS_URL,
      },
    });

    await app.startAllMicroservices();
  }

  await app.listen(port);
}
bootstrap();
