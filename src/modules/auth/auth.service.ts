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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
  }


  async login(user: any) {
    return this.createToken(user);
  }

  async create(body: CreateAuthDto) {
    const { password, companyId, userId } = body;

    const hashedPassword = Bcrypt.hash(password);

    const auth = this.authRepository.create({
      ...body,
      password: hashedPassword,
      company: companyId ? { id: companyId } : null,
      user: userId ? { id: userId } : null,
    });

    await this.authRepository.save(auth);
    return this.createToken(auth);
  }

  async updateRefreshToken(username: string, refreshToken: string): Promise<Auth> {
    const auth = await this.authRepository.findOne({ where: { username } });

    if (!auth) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }
    const refreshTokenExpiryTime = new Date(Date.now() + parseInt(this.configService.get('REFRESH_TOKEN_TIME')));

    auth.refreshToken = refreshToken;
    auth.refreshTokenExpiryTime = refreshTokenExpiryTime;

    return this.authRepository.save(auth);
  }

  async logout(userId: string): Promise<Auth> {
    const auth = await this.authRepository.findOne({ where: { id: userId } });

    if (!auth) {
      throw new BadRequestException('Kullanıcı bulunamadı');
    }

    auth.refreshToken = null;
    auth.refreshTokenExpiryTime = null;

    return this.authRepository.save(auth);
  }


  private async generateRefreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: this.configService.get('EXPIRES_REFRESH') });
  }

  //
  // async refreshToken(oldRefreshToken: string) {
  //   const auth = await this.authRepository.findOne({ where: { refreshToken: oldRefreshToken } });
  //
  //   if (!auth) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  //
  //   const newRefreshToken = await this.generateRefreshToken(auth.user);
  //   const accessToken = this.jwtService.sign({ username: auth.username, sub: auth.id });
  //
  //   await this.updateRefreshToken(auth.user.id, newRefreshToken);
  //
  //   return {
  //     access_token: accessToken,
  //     refresh_token: newRefreshToken,
  //   };
  // }

  async getAuths() {
    return await this.authRepository.find();
  }

  async validateAuth(username: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { username } });
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

}
