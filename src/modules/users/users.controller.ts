import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { path } from '@/constants/paths';
import { JwtAuthGuard } from '@/modules/auth/quards/jwt-auth-guard';
import { RolesGuard } from '@/modules/auth/quards/roles.guard';
import { Roles } from '@/modules/auth/roles.decorator';
import { ROLES } from '@/constants/enums/roles';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { UserDto } from '@/modules/users/dto/user.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }


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

}
