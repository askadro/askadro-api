import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { UserAddress } from '@/modules/users/entities/user.address.entity';
import { CompanyAddress } from '@/modules/company/entities/company.address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Province, District, UserAddress, CompanyAddress])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {
}
