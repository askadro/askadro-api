import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Bcrypt } from '@/utils/bcrypt';
import { DEFAULT_PW } from '@/constants/app';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly addressService: AddressesService,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { addressStatus, addressDetail, provinceId, districtId, ...userData } = createUserDto;
    const hashedPassword = Bcrypt.hash(userData.password || DEFAULT_PW);
    let addressEntity: Address = null;
    let userEntity: User = null;
    // Create user entity
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    userEntity = await this.userRepository.save(user);
    // Create and associate address if provided
    if (provinceId && districtId) {
      addressEntity = await this.addressService.create({
        addressStatus,
        addressDetail,
        provinceId,
        districtId,
        userId: userEntity.id,
      });
    }
    return await this.userRepository.save({ ...user, address: addressEntity });
  }


  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address', 'address.province', 'address.district'],
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string, soft: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    if (soft) {
      await this.userRepository.softDelete(id);
      return user;
    } else {
      await this.userRepository.remove(user);
      return user;
    }
  }

  async findAll(relations: string[] = []) {
    const users = await this.userRepository.find({
      relations,
    });

    if (!users) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }

    return users;
  }

  async deletedUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });
  }

  async findOne(id: string, relations: string[] = []): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations,
    });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return user;
  }

}
