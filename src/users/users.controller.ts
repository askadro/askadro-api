import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { USERS } from "../constants/paths";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(USERS.users)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(USERS.userJob)
  async userJobFindOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.userJobFindOne(id);
  }

  @Get(USERS.user)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Post(USERS.userCreate)
  create(@Body() createUserDto: CreateUserDto) {
    console.log(`createUserDto: `, createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Patch(USERS.userUpdate)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(USERS.userDelete)
  async remove(@Param('id') id: string,@Query("soft") soft: string): Promise<User> {
    return await this.usersService.remove(id,soft);
  }
}
