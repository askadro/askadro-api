import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { CommonService } from '@/modules/common/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address, User, Company, Province, District]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService,CommonService],
  exports: [AddressesService],
})
export class AddressesModule {}
