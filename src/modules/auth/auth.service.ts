import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '@/modules/auth/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Bcrypt } from '@/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }


  async login(user: any) {
    return this.createToken(user);
  }

  async create(body: CreateUserDto) {
    const { password } = body;

    const hashedPassword = Bcrypt.hash(password);
    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
    })
    await this.userRepository.save(user);
    return this.createToken(user)
  }

  async updateRefreshToken(identity: string, refreshToken: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { identity } });

    if (!user) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }
    const refreshTokenExpiryTime = new Date(Date.now() + parseInt(this.configService.get('REFRESH_TOKEN_TIME')));

    user.refreshToken = refreshToken;
    user.refreshTokenExpiryTime = refreshTokenExpiryTime;

    return this.userRepository.save(user);
  }

  async logout(user: any): Promise<boolean> {
    const _user = await this.userRepository.findOne({ where: { id: user.userId } });

    if (!_user) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }

    _user.refreshToken = null;
    _user.refreshTokenExpiryTime = null;

    return true
  }


  private async generateRefreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: this.configService.get('EXPIRES_REFRESH') });
  }

  async getAuths() {
    return await this.userRepository.find();
  }

  async validateAuth(identity: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { identity } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private createToken(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(user: any) {
    return this.createToken(user);
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // Ek doğrulama işlemleri yapabilirsiniz (örn. kullanıcı veritabanında var mı?)
      if (decoded) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

}
