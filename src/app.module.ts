import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsMailerModule } from '@/modules/as-mailer/as-mailer.module';
import { AsMailerService } from '@/modules/as-mailer/as-mailer.service';
import { CommonModule } from './modules/common/common.module';
import { IsUniqueConstraint } from '@/utils/validations/unique/is-unique';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { UsersModule } from '@/modules/users/users.module';
import { JobsModule } from '@/modules/jobs/jobs.module';
import { CompanyModule } from '@/modules/company/company.module';
import { TicketsModule } from '@/modules/tickets/tickets.module';
import { ProvincesModule } from '@/modules/provinces/provinces.module';
import { ConfigurationModule } from '@/configuration/configuration.module';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { AuthModule } from '@/modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env','.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        password: configService.get('POSTGRES_PASSWORD'),
        username: configService.get('POSTGRES_USER'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        database: configService.get('POSTGRES_DB'),
        synchronize: false, // prod da false olmalı
        autoLoadEntities:true,
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
    AsMailerModule,
    UsersModule,
    JobsModule,
    CompanyModule,
    TicketsModule,
    ProvincesModule,
    ConfigurationModule,
    AddressesModule,
    Authorized,
    AuthModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService, AsMailerService,IsUniqueConstraint,JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  onModuleInit() {
    IsUniqueConstraint.dataSource = this.dataSource;
  }
}
