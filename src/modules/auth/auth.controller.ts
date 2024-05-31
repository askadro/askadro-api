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
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { LocalAuthGuard } from '@/modules/auth/quards/local-auth-guard';
import { Response, Request } from 'express';
import { Public } from '@/decorators/public.decorator';
import { JwtAuthGuard } from '@/modules/auth/quards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req:Request) {
    return this.authService.login(req.user)
    // try {
    //   const { access_token, refresh_token } = await this.authService.login(req.user);
    //   res.cookie('access_token', access_token, { httpOnly: true });
    //   return res.send({ access_token,refresh_token});
    // } catch (error) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Put('update-refresh-token/:userId')
  async updateRefreshToken(
    @Param('userId') userId: string,
    @Body('refreshToken') refreshToken: string,
  ): Promise<Auth> {
    return this.authService.updateRefreshToken(userId, refreshToken);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string): Promise<Auth> {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req:Request) {
    return this.authService.refreshToken(req.user);
  }

  @Get('auths')
  getAuths(): Promise<Auth[]> {
    return this.authService.getAuths();
  }

}
