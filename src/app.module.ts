import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/job.entity';
import { CompanyModule } from './company/company.module';
import { TicketsModule } from './tickets/tickets.module';
import { Authorized } from './company/entities/authorized.entity';
import { Company } from './company/entities/company.entity';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from "path";
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
        entities: [Job, Company, Authorized],
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),

    I18nModule.forRoot({
      fallbackLanguage: "en",
      fallbacks: {
        "en-US": "en",
        "tr-TR": "tr"
      },
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true
      },
      resolvers: [
        { use: QueryResolver, options: ["lang", "locale", "l"] },
        new HeaderResolver(["x-custom-lang"]),
        AcceptLanguageResolver,
        // new CookieResolver(["lang", "locale", "l"]) 
      ]
    }),

    UsersModule,
    RouterModule.register([{ path: 'users', module: UserModule }]),
    JobsModule,
    CompanyModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
