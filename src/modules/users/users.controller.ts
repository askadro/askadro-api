import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { path } from '@/constants/paths';
import { Bcrypt } from '@/utils/bcrypt';
import { UpdateAuthDto } from '@/modules/auth/dto/update-auth.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post("/create")
  async create(@Body() body: CreateUserDto) {
    if (body.auth) {
      body.auth.password = Bcrypt.hash(body.auth.password);
    }

    return this.usersService.create(body);
  }

  // @Post(path.users.userAddressCreate)
  // createAddress(@Param('id') id: string, @Body() createAddressUserDto: CreateAddressUserDto): Promise<UserAddress> {
  //   return this.usersService.createAddress(id, createAddressUserDto);
  // }
  //
  // @Patch(path.users.userAddressUpdate)
  // async updateAddress(@Param('userAddressId') id: string, @Body() updateAddressUserDto: Body): Promise<Address> {
  //   return await this.usersService.updateAddress(id, updateAddressUserDto);
  // }

  @Patch(path.users.userUpdate)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(path.users.userDelete)
  async remove(@Param('id') id: string, @Query('soft') soft: string): Promise<User> {
    return await this.usersService.remove(id, soft);
  }

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
  async userSearch(@Param('query') query: string) {
    const queryTrim: string = query.trim();

    const queryLower: string = queryTrim.toLowerCase();

    return await this.usersService.userSearch(queryLower);
  }

  @Get(path.users.user)
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(path.users.update_auth)
  updateUserAuth(@Param("userId") id: string, @Body() body: UpdateAuthDto): Promise<User> {
    return this.usersService.updateUserAuth(id,body)
  }



}
