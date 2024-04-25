import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { path } from '@/constants/paths';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(path.users.main)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(path.users.deletedUsers)
  deletedUsers() {
    return this.usersService.deletedUsers();
  }

  @Get(path.users.userJob)
  async userJobFindOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.userJobFindOne(id);
  }

  @Get(path.users.userSearch)
 async userSearch(@Param('query') query:string) {
    const queryTrim:string=query.trim();

    const queryLower:string=queryTrim.toLowerCase();

    return await this.usersService.userSearch(queryLower);
  }

  @Get(path.users.user)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Post(path.users.userCreate)
  create(@Body() createUserDto: CreateUserDto) {
    console.log(`createUserDto: `, createUserDto);
    return this.usersService.create(createUserDto);
  }
 
  @Patch(path.users.userUpdate)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(path.users.userDelete)
  async remove(@Param('id') id: string,@Query("soft") soft: string): Promise<User> {
    return await this.usersService.remove(id,soft);
  }
}
