import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '@/modules/common/common.service';
import { Auth } from '@/modules/auth/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Bcrypt } from '@/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.generateRefreshToken(user),
    };
  }

  async create(body: CreateAuthDto) {
    const { email, username, password, companyId, userId, refreshToken, refreshTokenExpiryTime, salt } = body;
    if (email) {
      const existingEmail = await this.authRepository.findOne({ where: { email } });
      if (existingEmail) {
        throw new BadRequestException('Bu email adresi zaten kayıtlı');
      }
    }

    if (username) {
      const existingUsername = await this.authRepository.findOne({ where: { username } });
      if (existingUsername) {
        throw new BadRequestException('Bu kullanıcı adı zaten kayıtlı');
      }
    }

    const hashedPassword = Bcrypt.hash(password);

    const auth = this.authRepository.create({
      email,
      username,
      password: hashedPassword,
      salt,
      refreshToken,
      refreshTokenExpiryTime,
      company: companyId ? { id: companyId } : null,
      user: userId ? { id: userId } : null,
    });

    return await this.authRepository.save(auth);
  }

  async updateRefreshToken(userId: string, refreshToken: string, refreshTokenExpiryTime: Date): Promise<Auth> {
    const auth = await this.authRepository.findOne({ where: { user: { id: userId } } });

    if (!auth) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }

    auth.refreshToken = refreshToken;
    auth.refreshTokenExpiryTime = refreshTokenExpiryTime;

    return this.authRepository.save(auth);
  }

  async logout(userId: string): Promise<Auth> {
    const auth = await this.authRepository.findOne({ where: { user: { id: userId } } });

    if (!auth) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }

    auth.refreshToken = null;
    auth.refreshTokenExpiryTime = null;

    return this.authRepository.save(auth);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async generateRefreshToken(user: any) {
    const refreshToken = this.jwtService.sign({ username: user.username, sub: user.id }, { expiresIn: '7d' });
    const refreshTokenExpiryTime = new Date();
    refreshTokenExpiryTime.setDate(refreshTokenExpiryTime.getDate() + 7);

    await this.updateRefreshToken(user.id, refreshToken, refreshTokenExpiryTime);
    return refreshToken;
  }

}
