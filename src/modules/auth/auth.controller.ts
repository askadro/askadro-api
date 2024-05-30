import { Body, Controller, Param, Post, Put, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { LocalAuthGuard } from '@/quards/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto): Promise<Auth> {
    return this.authService.create(createAuthDto);
  }

  @Put('update-refresh-token/:userId')
  async updateRefreshToken(
    @Param('userId') userId: string,
    @Body('refreshToken') refreshToken: string,
    @Body('refreshTokenExpiryTime') refreshTokenExpiryTime: Date,
  ): Promise<Auth> {
    return this.authService.updateRefreshToken(userId, refreshToken, refreshTokenExpiryTime);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string): Promise<Auth> {
    return this.authService.logout(userId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req:any) {
    return this.authService.login(req.user);
  }
}
