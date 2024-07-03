import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private readonly configService: ConfigService,
              private readonly httpService: HttpService) {
  }
  baseUrl =  this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL')
  realm = this.configService.get<string>('KC_REALM_NAME')
  clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID')
  adminUsername = this.configService.get<string>('KEYCLOAK_ADMIN')
  adminPassword = this.configService.get<string>('KEYCLOAK_ADMIN_PASSWORD')

  async getClientSecretKey() {
    const url = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    const data = {
      username:this.adminUsername,
      password:this.adminPassword,
      grant_type: 'password',
      client_id: "admin-cli",
    }
    console.log(new URLSearchParams(data).toString());
    const response = await this.httpService.post(url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
    }).toPromise();

    const access_token = response.data.access_token;
    if(!access_token){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const clientUuidUrl = `${this.baseUrl}/admin/realms/${this.realm}/clients`;
    const responseForUuid = await this.httpService.get(clientUuidUrl, {
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${access_token}`},
    }).toPromise();

    return responseForUuid.data
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
      realm: this.configService.get<string>('KC_REALM_NAME'),
      clientId: this.clientId,
      secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
      bearerOnly: true,
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
