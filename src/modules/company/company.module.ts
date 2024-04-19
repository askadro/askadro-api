import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@/modules/company/entities/company.entity';
import { Authorized } from '@/modules/company/entities/authorized.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Authorized])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
