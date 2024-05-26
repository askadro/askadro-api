import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Address } from '@/modules/addresses/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User,Address])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
}
