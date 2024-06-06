import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';
import { Company } from '@/modules/company/entities/company.entity';
import { CommonModule } from '@/modules/common/common.module';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Auth,Province,District,Company, Job,Ticket]),CommonModule,AuthModule],
  controllers: [UsersController],
  providers: [UsersService,CommonService,AddressesService,JwtService],
  exports: [UsersService],
})
export class UsersModule {}
