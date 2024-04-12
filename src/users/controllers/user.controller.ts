import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UsersInterface } from '../interfaces/users.interface';
import { GetUserInterface } from '../interfaces/get.user.interface';
import { DeleteUserInterface } from '../interfaces/delete.user.interface';
import { UpdateUserInterface } from '../interfaces/update.user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): UsersInterface[] {
    return this.userService.getUsers();
  }

  @Get(':username')
  getUser(@Param('username') username: string): GetUserInterface {
    return this.userService.getUser(username);
  }

  @Put('user-update/:id')
  userUpdate(@Param('id') id: number): UpdateUserInterface {
    return this.userService.userUpdate(id);
  }

  @Delete('user-delete/:id')
  deleteUser(@Param('id') id: number): DeleteUserInterface {
    return this.userService.deleteUser(id);
  }
}
