import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Auth } from '@/auth/entities/auth.entity';
import { AuthService } from '@/auth/auth.service';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { AddressesModule } from '@/modules/addresses/addresses.module';
import { CommonService } from '@/modules/common/common.service';
import { Company } from '@/modules/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Auth,Province,District,Company]),AddressesModule],
  controllers: [UsersController],
  providers: [UsersService,AuthService,CommonService],
  exports: [UsersService],
})
export class UsersModule {}
