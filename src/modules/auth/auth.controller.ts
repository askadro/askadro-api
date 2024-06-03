import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
  Get, BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { LocalAuthGuard } from '@/modules/auth/quards/local-auth-guard';
import { Response, Request } from 'express';
import { Public } from '@/decorators/public.decorator';
import { JwtAuthGuard } from '@/modules/auth/quards/jwt-auth-guard';
import { User } from '@/modules/users/entities/user.entity';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req:Request) {
    return this.authService.login(req.user)
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Put('update-refresh-token/:userId')
  async updateRefreshToken(
    @Param('userId') userId: string,
    @Body('refreshToken') refreshToken: string,
  ): Promise<User> {
    return this.authService.updateRefreshToken(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req:any): Promise<boolean> {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req:Request) {
    return this.authService.refreshToken(req.user);
  }

  @Get('auths')
  getAuths(): Promise<User[]> {
    return this.authService.getAuths();
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    const isValid = await this.authService.validateToken(token);

    if (!isValid) {
      throw new BadRequestException('Invalid token');
    }

    return { valid: true };
  }

}
