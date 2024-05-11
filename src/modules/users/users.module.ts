import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from '@/modules/users/entities/user.address.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { Auth } from '@/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress, Address, Province, District, Auth])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
