import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/create")
  create(@Body() createUserDto: CreateUserDto) {
    console.log(`createUserDto: `, createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/job/users')
 async userJobFindAll() {
    return await this.usersService.userJobFindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/delete/:id?soft=true')
  async remove(@Param('id') id: string,@Query("soft") soft: string) {
    return await this.usersService.remove(id,soft);
  }
}
