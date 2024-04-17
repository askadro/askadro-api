import { RouterModule } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/job.entity';
import { CompanyModule } from './company/company.module';
import { TicketsModule } from './tickets/tickets.module';
import { Authorized } from './company/entities/authorized.entity';
import { Company } from './company/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '24262060',
      username: 'postgres',
      entities: [Job, Company, Authorized],
      database: 'askadrovip',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RouterModule.register([{ path: 'users', module: UserModule }]),
    JobsModule,
    CompanyModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
