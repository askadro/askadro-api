import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly userService: UsersService) {
    super();}

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOne(payload.userId);
    console.log("user: ",user);
    if (!user) {
      throw new UnauthorizedException("JwtAuthGuard");
    }

    return user;
  }
}
