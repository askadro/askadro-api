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


  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.baseUrl,
      realm: this.configService.get<string>('KC_REALM_NAME'),
      clientId: this.clientId,
      secret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
      bearerOnly: true,
      useNestLogger: true,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
