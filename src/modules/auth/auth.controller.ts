import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Bcrypt } from '@/utils/bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    const hashPassword: string = Bcrypt.hash('password');

    console.log(Bcrypt.compare(createAuthDto.password, hashPassword));
    return this.authService.login(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }


}
