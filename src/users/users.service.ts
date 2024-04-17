import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) { }
 async create(createUserDto: CreateUserDto) {
    try {
      return await this.usersRepository.save({
        Identity: createUserDto.Identity,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        age: createUserDto.age,
        birth_date: createUserDto.birth_date,
        gender: createUserDto.gender
      });
    } catch (error) {
      throw new NotFoundException({ message: "User not created" ,error: error});
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
