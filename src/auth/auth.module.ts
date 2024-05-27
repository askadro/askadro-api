import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { CommonService } from '@/modules/common/common.service';
import { Company } from '@/modules/company/entities/company.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User,Address,Company,Province,District])],
  controllers: [AuthController],
  providers: [AuthService,CommonService],
  exports: [AuthService],
})
export class AuthModule {
}
