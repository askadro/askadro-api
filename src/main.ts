import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    logger: ['debug', 'error', 'fatal', 'warn', 'verbose', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const configService = app.get<ConfigService>(ConfigService);
  const appPort = configService.get('PORT') ?? 5062;
  app.use(helmet());
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    // defaultVersion: "1"
  });
  // app.use(passport.initialize());
  // app.use(passport.session());

  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function(user: any, done) {
  //   done(null, user);
  // });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(appPort, () => {
    console.log(`Application is running on: http://localhost:${appPort}}`)
  });
}

bootstrap();
