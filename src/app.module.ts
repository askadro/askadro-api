import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/job.entity';
import { CompanyModule } from './company/company.module';
import { TicketsModule } from './tickets/tickets.module';
import { Authorized } from './company/entities/authorized.entity';
import { Company } from './company/entities/company.entity';
import { UsersModule } from './users/users.module';
import { User } from "./users/entities/user.entity";
import { ProvincesModule } from './provinces/provinces.module';
import { Province } from "./provinces/entities/province.entity";
import { District } from "./provinces/entities/district.entity";

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
      entities: [User, Job, Company, Authorized,Province,District],
      database: 'askadrovip',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    // RouterModule.register([{ path: 'users', module: UserModule }]),
    JobsModule,
    CompanyModule,
    TicketsModule,
    ProvincesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
