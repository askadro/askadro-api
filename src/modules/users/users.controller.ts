import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { AuthService } from '@/modules/users/auth.service';
import { Public, Resource, Roles, Scopes } from 'nest-keycloak-connect';
import { CreateKcUserDto } from '@/modules/users/dto/create-kc-user.dto';

@Resource(User.name)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
  }

  @Public()
  @Post('login')
  async login(@Body() { username, password }: { username: string, password: string }) {
    return this.authService.login(username, password);
  }

  @Roles({ roles: ['admin'] })
  @Post('register')
  async register(
    @Body() createKcUserDto: CreateKcUserDto,
    @Headers('authorization') authorization: string,
  ) {
    return this.authService.register(createKcUserDto, authorization);
  }

  @Roles({ roles: ['user', 'admin'] })
  @Get('profile')
  async profile(@Headers('authorization') authorization: string) {
    return this.authService.profile(authorization);
  }

  @Roles({ roles: ['admin'] })
  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Roles({ roles: ['user', 'admin'] })
  @Get()
  findAll(@Req() req: any) {
    return this.usersService.findAll();
  }

  @Roles({ roles: ['admin'] })
  @Patch(path.users.userUpdate)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles({ roles: ['admin'] })
  @Delete(path.users.userDelete)
  async remove(@Param('id') id: string, @Query('soft') soft: string): Promise<User> {
    return await this.usersService.remove(id, soft);
  }

  @Roles({ roles: ['user', 'admin'] })
  @Get(path.users.deletedUsers)
  async deletedUsers() {
    return this.usersService.deletedUsers();
  }

  @Roles({ roles: ['user', 'admin'] })
  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Public()
  @Post('logout')
  async logout(@Req() req: any): Promise<boolean> {
    return this.authService.logout(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('refresh')
  // async refreshToken(@Req() req: Request) {
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
  // @Put('update-refresh-token/:userId')
  // async updateRefreshToken(
  //   @Param('userId') userId: string,
  //   @Body('refreshToken') refreshToken: string,
  // ): Promise<User> {
  //   return this.authService.updateRefreshToken(userId, refreshToken);
  // }
}
