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

@Module({
  imports: [TypeOrmModule.forFeature([Company, Authorized, Address, Province, District, Auth])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
