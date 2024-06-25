import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { path } from '@/constants/paths';
import { JwtAuthGuard } from '@/modules/users/quards/jwt-auth-guard';
import { RolesGuard } from '@/modules/users/quards/roles.guard';
import { Roles } from '@/modules/users/roles.decorator';
import { ROLES } from '@/constants/enums/roles';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from '@/modules/users/dto/user.dto';
import { LocalAuthGuard } from '@/modules/users/quards/local-auth-guard';
import { Request } from 'express';
import { AuthService } from '@/modules/users/auth.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req:Request) {
    return this.authService.login(req.user)
  }

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.create(createUserDto);
  // }

  @Post("/create")
  async create(@Body() body: CreateUserDto) {
    console.log(new Date().toISOString());
    return this.usersService.create(body);
  }

  @Get("/profile")
  async getProfile(@Req() req:any) {
    console.log("req");
    return await this.usersService.findOne(req.user.userId)
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

  @Post('validate-token')
  async validateToken(@Body('token') token: string) {
    const isValid = await this.authService.validateToken(token);

    if (!isValid) {
      throw new BadRequestException('Invalid token');
    }

    return { valid: true };
  }


  @Put('update-refresh-token/:userId')
  async updateRefreshToken(
    @Param('userId') userId: string,
    @Body('refreshToken') refreshToken: string,
  ): Promise<User> {
    return this.authService.updateRefreshToken(userId, refreshToken);
  }

}
