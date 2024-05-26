import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {
  }

  login(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

 async create(body: CreateAuthDto) {
    const auth = this.authRepository.create(body);
    if(!auth) {
      throw new BadRequestException('Yetkilendirme bilgisi oluşturulurken bir hata oluştu.');
    }
    return await this.authRepository.save(auth);
  }

  findAll() {
    return `This action returns all auth`;
  }

  async authFindOne(id: string): Promise<Auth> {
    return await this.authRepository.findOne({ where: { id: id } });
  }
}
