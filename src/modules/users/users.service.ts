import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateAddressUserDto } from '@/modules/users/dto/create-address-user.dto';
import { UpdateAddressUserDto } from '@/modules/users/dto/update-address-user.dto';
import { UserAddress } from '@/modules/users/entities/user.address.entity';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Province } from '@/modules/provinces/entities/province.entity';
import { District } from '@/modules/provinces/entities/district.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserAddress) private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
    @InjectRepository(District) private districtRepository: Repository<District>,
  ) {
  }

  async findAll(relations: object = {}) {
    const users = await this.usersRepository.find({
      relations,
    });

    if (!users) {
      throw new NotFoundException('users not found');
    }

    return users;
  }

  async deletedUsers(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!users) {
      throw new NotFoundException('users not found');
    }
    return users;
  }

  async userJobFindOne(id: string) {
    const jobUser = await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        job: {
          id: true,
          startTime: true,
          extraTime: true,
          endTime: true,
          company: {
            id: true,
            name: true,
          },
        },
      },
      relations: {
        job: {
          company: true,
        },
      },
    });

    if (!jobUser) {
      throw new NotFoundException('job user not found');
    }

    return jobUser;
  }

  async findOne(id: string, relations: object = {}): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      Identity: createUserDto.Identity?.trim(),
      firstName: createUserDto.firstName?.trim(),
      lastName: createUserDto.lastName?.trim(),
      birthDate: createUserDto.birthDate,
      gender: createUserDto.gender,
    });
    return await this.usersRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: string, soft: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (soft === 'true') {
      const softDelete = await this.usersRepository.softDelete(id);

      if (!softDelete.affected) {
        throw new NotFoundException('user not found');
      }
      return user;
    }
    return await this.usersRepository.remove(user);
  }

  async userSearch(query: string) {
    const users = await this.usersRepository.createQueryBuilder('user').where('CONCAT(user.firstName, \' \', user.lastName) ilike :fullName', { fullName: `%${query}%` }).getMany();

    if (!users) {
      throw new NotFoundException('users not found');
    }

    return users;
  }

  async createAddress(id: string, createAddressUserDto: CreateAddressUserDto) {
    const user: User = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const province: Province = await this.provinceRepository.findOne({
      where: {
        id: createAddressUserDto.city,
      },
    });

    const district: District = await this.districtRepository.findOne({

      where: {
        id: createAddressUserDto.district,
      },
    });

    const address: Address = this.addressRepository.create({
      city: province,
      district: district,
      address: createAddressUserDto.address,
      addressStatus: createAddressUserDto.addressStatus,
    });

    const addressSave: Address = await this.addressRepository.save(address);


    const userAddress: UserAddress = this.userAddressRepository.create({
      user: user,
      address: addressSave,
    });

    return await this.userAddressRepository.save(userAddress);

  }

  updateAddress(id: string, updateAddressUserDto: UpdateAddressUserDto) {

  }
}
