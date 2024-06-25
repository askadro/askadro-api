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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Job } from '@/modules/jobs/job.entity';
import { Ticket } from '@/modules/tickets/ticket.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/modules/users/auth.service';
import { JwtStrategy, LocalStrategy } from '@/modules/users/strategies';
import { JwtAuthGuard } from '@/modules/users/quards/jwt-auth-guard';
import { RolesGuard } from '@/modules/users/quards/roles.guard';
import { PassportModule } from '@nestjs/passport';
import { AddressesModule } from '@/modules/addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Province, District, Company, Job, Ticket]), CommonModule, PassportModule,AddressesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY_JWT'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    })],
  controllers: [UsersController],
  providers: [UsersService, CommonService,
    AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, RolesGuard, ConfigService],
  exports: [UsersService],
})
export class UsersModule {
}
