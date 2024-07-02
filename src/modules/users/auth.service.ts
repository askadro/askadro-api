import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bcrypt } from '@/utils/bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { User } from '@/modules/users/entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { CreateKcUserDto } from '@/modules/users/dto/create-kc-user.dto';
import { KeycloakConfigService } from '@/modules/config/keycloak-config.service';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
  }

  async login(username: string, password: string) {
    const data = {
      client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
      username: username,
      password: password,
      grant_type: 'password',
      client_secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
    };
    const url = `${this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')}/realms/${this.configService.get<string>('KEYCLOAK_REALM')}/protocol/openid-connect/token`;

    const response = await this.httpService.post(url, new URLSearchParams(data).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).toPromise();

    return response.data;
  }

  async logout(refreshToken: string) {
    const data = {
      client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
      refresh_token: refreshToken,
      client_secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
    };

    const url = `${this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')}/realms/${this.configService.get<string>('KEYCLOAK_REALM')}/protocol/openid-connect/logout`;

    const response = await this.httpService.post(url, new URLSearchParams(data).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).toPromise();

    return response.data;
  }

  async register(createKcUserDto: CreateKcUserDto, token: string) {
    const { username, password, email, firstName, lastName } = createKcUserDto;
    const baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')
    const realm = this.configService.get<string>('KEYCLOAK_REALM')

    const url = `${baseUrl}/admin/realms/${realm}/users`;

    const data = {
      username,
      email,
      firstName,
      lastName,
      enabled: true,
      attributes: {},
      groups: [],
      emailVerified: '',
      requiredActions:[],
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };
    console.log(token, data);
    const response = await this.httpService.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    }).toPromise();
    console.log(response);
    return response;
  }

  async profile(token: string) {
    const baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')
    const realm = this.configService.get<string>('KEYCLOAK_REALM')

    const url = `${baseUrl}/realms/${realm}/account`;

    const response = await this.httpService.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': token,
      },
    }).toPromise();
    return response.data;
  }
}
