import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';
import { CommonController } from '@/modules/common/common.controller';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Company,Province,District,Job,Ticket])],
  providers: [CommonService],
  exports: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
