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
import { join } from 'path';
import { UsersModule } from '@/modules/users/users.module';
import { JobsModule } from '@/modules/jobs/jobs.module';
import { CompanyModule } from '@/modules/company/company.module';
import { TicketsModule } from '@/modules/tickets/tickets.module';
import { ProvincesModule } from '@/modules/provinces/provinces.module';
import { ConfigurationModule } from '@/configuration/configuration.module';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { StaffModule } from '@/modules/staff/staff.module';
import { KeycloakConnectModule, AuthGuard, RoleGuard, ResourceGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConfigService } from '@/modules/config/keycloak-config.service';
import { ProviderConfigModule } from '@/modules/config/provider-config.module';
import { GlobalHttpModule } from '@/modules/common/global-http.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AccessTokenModule } from '@/modules/access-token/access-token.module';
import { HttpRequestModule } from '@/modules/http-request/http-request.module';


@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ProviderConfigModule],
    }),
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST','postgres'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true, // Set to false in production
        autoLoadEntities: true,
        // logging: true,
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
    CommonModule,
    StaffModule,
    GlobalHttpModule,
    AuthModule,
    AccessTokenModule,
    HttpRequestModule
  ],
  controllers: [AppController],
  providers: [AppService, AsMailerService, IsUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }

  onModuleInit() {
    IsUniqueConstraint.dataSource = this.dataSource;
  }
}
