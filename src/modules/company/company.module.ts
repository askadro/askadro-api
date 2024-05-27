import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@/modules/company/entities/company.entity';
import { Authorized } from '@/modules/company/entities/authorized.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { Auth } from '@/auth/entities/auth.entity';
import { AuthService } from '@/auth/auth.service';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { CommonModule } from '@/modules/common/common.module';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Authorized, Address, Province, District,Auth,User]),CommonModule],
  controllers: [CompanyController],
  providers: [CompanyService,AuthService,AddressesService,CompanyService],
})
export class CompanyModule {}
