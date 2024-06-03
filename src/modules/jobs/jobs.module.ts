import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { CommonService } from '@/modules/common/common.service';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job,User,Company]),UsersModule],
  controllers: [JobsController],
  providers: [JobsService,CommonService], // constructor da vermemiz gereken parametreler
  exports: [JobsService], // bu service içeriğini diğer modulelerde kullanılabilir yapar
})
export class JobsModule {}
