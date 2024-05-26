import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Address } from '@/modules/addresses/entities/address.entity';
import { Auth } from '@/auth/entities/auth.entity';
import { UpdateAuthDto } from '@/auth/dto/update-auth.dto';
import { AuthService } from '@/auth/auth.service';
import { AddressesService } from '@/modules/addresses/addresses.service';

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


  async create(body: CreateUserDto) {
    const { user_auth, address, ...userData } = body;

    let addressEntity: Address = null;
    let authEntity: Auth = null;
    let user: User = null;

    // Kullanıcıyı oluştur
    try {
      user = this.userRepository.create(userData);
      user = await this.userRepository.save(user);
    } catch (error) {
      // Kullanıcı oluşturulurken bir hata oluştu
      throw new BadRequestException('Kullanıcı oluşturulurken bir hata oluştu.');
    }

    // Address varsa oluştur ve user id'sini ata
    if (address) {
    addressEntity =  await this.addressService.create({...address, user: user});
    }

    // Auth varsa oluştur ve user id'sini ata
    if (user_auth) {
    authEntity =  await this.authService.create({ ...user_auth, user: user })
    }

    if (authEntity || addressEntity) {
      const updatedUser: Partial<User> = {};
      if (authEntity) {
        updatedUser.auth = authEntity;
      }
      if (addressEntity) {
        updatedUser.address = addressEntity;
      }
      try {
      await this.update(user.id,updatedUser)
      } catch (error) {
        // Kullanıcı güncellenirken bir hata oluştu
        throw new BadRequestException('Kullanıcı güncellenirken bir hata oluştu.');
      }
    }

    // Kullanıcı, Address ve Auth entity'lerini başarıyla oluşturduysak, kullanıcıyı geri döndür
    return {
      user:user,
      address:addressEntity,
      auth:authEntity
    };
  }


  async findUserOnlyOwnData(id:string){
    return await this.userRepository.findOne({where:{id:id}});
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(
      {
        where: {
          id: id,
        },
        relations: ['address', 'address.provinceId', 'address.districtId', 'auth'],
      });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string, soft: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (soft === 'true') {
      const softDelete = await this.userRepository.softDelete(id);

      if (!softDelete.affected) {
        throw new NotFoundException('user not found');
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
      throw new NotFoundException('users not found');
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
      throw new NotFoundException('users not found');
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
    const user: User = await this.userRepository.findOne({
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

  async userSearch(query: string) {
    const users = await this.userRepository.createQueryBuilder('user').where('CONCAT(user.firstName, \' \', user.lastName) ilike :fullName', { fullName: `%${query}%` }).getMany();

    if (!users) {
      throw new NotFoundException('users not found');
    }

    return users;
  }

  async updateUserAuth(userId: string, authData:UpdateAuthDto): Promise<User> {
    const user = await this.userRepository.findOne({where:{id:userId}});
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }
    console.log("auth: ",authData);
    if (!authData) {
      throw new BadRequestException('Yetkilendirme bilgisi eksik.');
    }

    const auth = await this.authRepository.findOne({ where: { user: user } });

    if (!auth) {
      throw new NotFoundException('Yetkilendirme bilgisi bulunamadı.');
    }

    try {
      this.authRepository.merge(auth, authData);
      await this.authRepository.save(auth);
      return user;
    } catch (error) {
      throw new BadRequestException('Yetkilendirme bilgisi güncellenirken bir hata oluştu.');
    }
  }
}
