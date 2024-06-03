import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { AddressesService } from '@/modules/addresses/addresses.service';
import { Auth } from '@/modules/auth/entities/auth.entity';
import { AuthService } from '@/modules/auth/auth.service';
import { Bcrypt } from '@/utils/bcrypt';
import { DEFAULT_PW } from '@/constants/app';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private readonly authService: AuthService,
    private readonly addressService: AddressesService,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { address, ...userData } = createUserDto;
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
    if (address) {
      addressEntity = await this.addressService.create({ ...address, userId: userEntity.id });
    }

    return await this.userRepository.save({ ...user, address: addressEntity });
  }

  async getProfile() {

  }

  async findUserOnlyOwnData(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address', 'address.province', 'address.district', 'auth'],
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string, soft: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    if (soft === 'true') {
      const softDelete = await this.userRepository.softDelete(id);

      if (!softDelete.affected) {
        throw new NotFoundException('Kullanıcı bulunamadı.');
      }
      return user;
    }
    return await this.userRepository.remove(user);
  }

  async findAll(relations: object = {}) {
    const users = await this.userRepository.find({
      relations,
    });

    if (!users) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }

    return users;
  }

  async deletedUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    if (!users) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }
    return users;
  }

  async userJobFindOne(id: string) {
    const jobUser = await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        job: {
          id: true,
          enterTime: true,
          extraTime: true,
          exitTime: true,
        },
      },
      relations: ['job'],
    });

    if (!jobUser) {
      throw new NotFoundException('Job user bulunamadı.');
    }

    return jobUser;
  }

  async findOne(id: string, relations: object = {}): Promise<User> {
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

  async userSearch(query: string) {
    const users = await this.userRepository.createQueryBuilder('user')
      .where('CONCAT(user.firstName, \' \', user.lastName) ilike :fullName', { fullName: `%${query}%` })
      .getMany();

    if (!users) {
      throw new NotFoundException('Kullanıcılar bulunamadı.');
    }

    return users;
  }

  // async updateUserAuth(userId: string, authData: UpdateAuthDto): Promise<User> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new NotFoundException('Kullanıcı bulunamadı.');
  //   }
  //
  //   if (!authData) {
  //     throw new BadRequestException('Yetkilendirme bilgisi eksik.');
  //   }
  //
  //   const auth = await this.authRepository.findOne({ where: { user: user } });
  //
  //   if (!auth) {
  //     throw new NotFoundException('Yetkilendirme bilgisi bulunamadı.');
  //   }
  //
  //   try {
  //     this.authRepository.merge(auth, authData);
  //     await this.authRepository.save(auth);
  //     return user;
  //   } catch (error) {
  //     throw new BadRequestException('Yetkilendirme bilgisi güncellenirken bir hata oluştu.');
  //   }
  // }
}
