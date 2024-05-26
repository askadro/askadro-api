import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Auth } from '@/auth/entities/auth.entity';
import { AuthService } from '@/auth/auth.service';
import { AddressesService } from '@/modules/addresses/addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Auth])],
  controllers: [UsersController],
  providers: [UsersService,AuthService,AddressesService],
  exports: [UsersService],
})
export class UsersModule {}
