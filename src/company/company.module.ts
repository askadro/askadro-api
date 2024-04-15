import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [JobsModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
