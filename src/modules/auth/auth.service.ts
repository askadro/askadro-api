import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '@/modules/auth/entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {
  }

  login(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  async authFindOne(id: string): Promise<Auth> {
    return await this.authRepository.findOne({ where: { id: id } });
  }
}
