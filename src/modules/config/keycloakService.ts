import * as KeycloakInterface from 'keycloak-js';
import { Injectable } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { ConfigService } from '@nestjs/config';

export interface ConfigOptions {
  clientId: string;
  realm: string;
  url: string;
}

const Keycloak = (KeycloakInterface as any).default || KeycloakInterface;

@Injectable()
export class KeycloakService {
  kcAdminClient: KcAdminClient;

  constructor(private configService: ConfigService) {
    this.initAdmin().then().catch(error => {
      console.error('Failed to initialize Keycloak Admin:', error);
    });
  }

  async kcAuth(username: string, password: string) {
    try {
      return await this.kcAdminClient.auth({
        clientId: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
        username: username,
        password: password,
        grantType: 'password',
        clientSecret: this.configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
      });
    } catch (error) {
      console.error('Failed to authenticate with Keycloak:', error);
      throw error;
    }
  }

  private dynamicKeycloakImport = async () =>
    new Function("return import('@keycloak/keycloak-admin-client')")();

  private async initAdmin() {
    try {
      const KCadmCli = (await this.dynamicKeycloakImport()).default;
      this.kcAdminClient = new KCadmCli({
        baseUrl: this.configService.get('KEYCLOAK_AUTH_SERVER_URL'),
        realmName: this.configService.get('KC_REALM_NAME'),
      });

      // await this.kcAdminClient.auth({
      //   username: this.configService.get('KEYCLOAK_ADMIN'),
      //   password: this.configService.get('KEYCLOAK_ADMIN_PASSWORD'),
      //   grantType: 'password',
      //   clientId: 'admin-cli',
      // });
    } catch (error) {
      console.error('Failed to initialize Keycloak Admin Client:', error);
      throw error;
    }
  }
}
