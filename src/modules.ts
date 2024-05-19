import { UsersModule } from '@/modules/users/users.module';
import { JobsModule } from '@/modules/jobs/jobs.module';
import { CompanyModule } from '@/modules/company/company.module';
import { TicketsModule } from '@/modules/tickets/tickets.module';
import { ProvincesModule } from '@/modules/provinces/provinces.module';
import { ConfigurationModule } from '@/configuration/configuration.module';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { AuthModule } from '@/modules/auth/auth.module';

export const modules: [
  UsersModule: typeof UsersModule,
  JobsModule: typeof JobsModule,
  CompanyModule: typeof CompanyModule,
  TicketsModule: typeof TicketsModule,
  ProvincesModule: typeof ProvincesModule,
  ConfigurationModule: typeof ConfigurationModule,
  AddressesModule: typeof AddressesModule,
  Authorized: typeof Authorized,
  AuthModule: typeof AuthModule
] = [
  UsersModule,
  JobsModule,
  CompanyModule,
  TicketsModule,
  ProvincesModule,
  ConfigurationModule,
  AddressesModule,
  Authorized,
  AuthModule,
];