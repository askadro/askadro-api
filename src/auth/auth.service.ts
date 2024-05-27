import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { CommonService } from '@/modules/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly commonService: CommonService,
  ) {
  }

  login(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async create(body: CreateAuthDto) {
    const { userId, username, password, companyId, refreshTokenExpiryTime, refreshToken, salt, email } = body;
    const { user, company } = await this.commonService.findUserOrCompany(userId, companyId);
    const auth = new Auth();
    auth.user = user;
    auth.company = company;
    auth.username = username;
    auth.password = password;
    auth.refreshTokenExpiryTime = refreshTokenExpiryTime;
    auth.refreshToken = refreshToken;
    auth.salt = salt;
    auth.email = email;

    if (!auth) {
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
