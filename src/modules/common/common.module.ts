import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Company,Province,District])],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
