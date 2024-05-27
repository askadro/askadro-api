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

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Auth,Province,District,Company]),CommonModule],
  controllers: [UsersController],
  providers: [UsersService,CommonService,AuthService,AddressesService],
  exports: [UsersService],
})
export class UsersModule {}
