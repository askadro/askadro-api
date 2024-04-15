import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { Job } from './job.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository], // constructor da vermemiz gereken parametreler
  exports: [JobsService], // bu service içeriğini diğer modulelerde kullanılabilir yapar
})
export class JobsModule {}
