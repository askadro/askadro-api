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
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      Identity: createUserDto.Identity.trim(),
      firstName: createUserDto.firstName.trim(),
      lastName: createUserDto.lastName.trim(),
      birthDate: createUserDto.birthDate,
      gender: createUserDto.gender
    });
    return await this.usersRepository.save(user);
  }

  async findAll(relations: object = {}) {
    const users = await this.usersRepository.find({
      relations
    });

    if (!users) {

      throw new NotFoundException("users not found");

    }

    return users;
  }

  async userJobFindAll() {
    const jobUsers = await this.usersRepository.find({
      relations: ["job"]
    });

    if (!jobUsers) {
      throw new NotFoundException("job users not found");
    }

    return jobUsers
  }

  async findOne(id: string, relations: object = {}) {
    return await this.usersRepository.findOne({
      where: {
        id: id
      },
      relations
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: string,soft: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    if (soft === "true") {
      return await this.usersRepository.softDelete(id);
    }
    return await this.usersRepository.remove(user);

  }
}
