import {
  Body,
  Controller,
  Delete,
  Get, Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { path } from '@/constants/paths';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from '@/modules/users/dto/user.dto';
import { Request } from 'express';
import { AuthService } from '@/modules/users/auth.service';
import { Public, Roles } from 'nest-keycloak-connect';
import { CreateKcUserDto } from '@/modules/users/dto/create-kc-user.dto';

// @Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login('abysmall', '24262060');
  }

  @Roles({ roles: ['user'] })
  @Post('register')
  async register(@Body() createKcUserDto: CreateKcUserDto,
                 @Headers('authorization') authorization: string) {
    return this.authService.register(createKcUserDto, authorization);
  }

  @Roles({ roles: ['admin'] })
  @Post('profile')
  async profile() {
    return this.authService.profile();
  }

  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    console.log(new Date().toISOString());
    return this.usersService.create(body);
  }

  @Get('/profile')
  async getProfile(@Req() req: any) {
    return await this.usersService.findOne(req.user.userId);
  }

  @Get()
  findAll(@Req() req: any) {
    console.log(req.user);
    return this.usersService.findAll();
  }

  @Patch(path.users.userUpdate)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(path.users.userDelete)
  async remove(@Param('id') id: string, @Query('soft') soft: string): Promise<User> {
    return await this.usersService.remove(id, soft);
  }

  @Get(path.users.deletedUsers)
  deletedUsers() {
    return this.usersService.deletedUsers();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('logout')
  async logout(@Req() req: any): Promise<boolean> {
    return this.authService.logout(req.user);
  }


  // @UseGuards(JwtAuthGuard)
  // @Post('refresh')
  // async refreshToken(@Req() req:Request) {
  //   return this.authService.refreshToken(req.user);
  // }
  //
  // @Post('validate-token')
  // async validateToken(@Body('token') token: string) {
  //   const isValid = await this.authService.validateToken(token);
  //
  //   if (!isValid) {
  //     throw new BadRequestException('Invalid token');
  //   }
  //
  //   return { valid: true };
  // }
  //
  //
  // @Put('update-refresh-token/:userId')
  // async updateRefreshToken(
  //   @Param('userId') userId: string,
  //   @Body('refreshToken') refreshToken: string,
  // ): Promise<User> {
  //   return this.authService.updateRefreshToken(userId, refreshToken);
  // }

}
