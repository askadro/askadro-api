import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonModule } from '@/modules/common/common.module';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/modules/users/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { HttpModule,  } from '@nestjs/axios';
import {
  KeycloakConnectModule,
} from 'nest-keycloak-connect';
import { KeycloakService } from '@/modules/config/keycloakService';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Province, District, Company, Job, Ticket]),
    CommonModule, PassportModule, AddressesModule, HttpModule,KeycloakConnectModule
  ],
  controllers: [UsersController],
  providers: [UsersService, CommonService,KeycloakService,
    AuthService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {
}
