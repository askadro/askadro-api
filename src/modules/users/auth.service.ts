import {
  Injectable,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CreateKcUserDto } from '@/modules/users/dto/create-kc-user.dto';
import { KeycloakConfigService } from '@/modules/config/keycloak-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly keycloakService: KeycloakConfigService,
  ) {
  }

  baseUrl = this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL');
  realm = this.configService.get<string>('KC_REALM_NAME');
  clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID')
  secret = this.configService.get<string>('KEYCLOAK_CLIENT_SECRET')

  async adminLogin(username: string, password: string) {
    const data = {
      client_id: "admin-cli",
      username: username,
      password: password,
      grant_type: 'password'
    };
    const url = `${this.baseUrl}/realms/master/protocol/openid-connect/token`;

    const response = await this.httpService.post(url, new URLSearchParams(data).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).toPromise();

    return response.data;
  }

  async login(username: string, password: string) {
    const data = {
      client_id: this.clientId,
      username: username,
      password: password,
      grant_type: 'password',
      client_secret: this.secret,
    };
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;

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

    const url = `${this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')}/realms/${this.configService.get<string>('KC_REALM_NAME')}/protocol/openid-connect/logout`;

    const response = await this.httpService.post(url, new URLSearchParams(data).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).toPromise();

    return response.data;
  }

  async register(createKcUserDto: CreateKcUserDto, token: string) {
    const { username, password, email, firstName, lastName } = createKcUserDto;

    const url = `${this.baseUrl}/admin/realms/${this.realm}/users`;

    const data = {
      username,
      email,
      firstName,
      lastName,
      enabled: true,
      attributes: {},
      groups: [],
      emailVerified: true,
      requiredActions: [],
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };
    try {
      const response = await this.httpService.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      }).toPromise();
      return response.data
    } catch (error) {
      return error.message
    }
  }

  async profile(token: string) {
    const url = `${this.baseUrl}/realms/${this.realm}/account`;

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
