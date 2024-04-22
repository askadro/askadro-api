import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Entities } from './entities';
import { ConfigurationModule } from './configuration/configuration.module';
import { IsUniqueConstraint } from "./utils/validations";
import { UsersModule } from "./modules/users/users.module";
import { JobsModule } from "./modules/jobs/jobs.module";
import { CompanyModule } from "./modules/company/company.module";
import { TicketsModule } from "./modules/tickets/tickets.module";
import { ProvincesModule } from "./modules/provinces/provinces.module";
import { PersonalCompanyModule } from './personal-company/personal-company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        password: configService.get('DB_PASSWORD'),
        username: configService.get('DB_USERNAME'),
        entities: Entities,
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-US': 'en',
        'tr-TR': 'tr',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        // new CookieResolver(["lang", "locale", "l"])
      ],
    }),

    UsersModule,
    JobsModule,
    CompanyModule,
    TicketsModule,
    ProvincesModule,
    ConfigurationModule,
    PersonalCompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService,IsUniqueConstraint],
})
export class AppModule {}
