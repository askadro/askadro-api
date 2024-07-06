import { Global, LogLevel, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
const logLevel: LogLevel[] = process.env.NODE_ENV === 'prod' ? ['warn'] : ['verbose'];
@Global()
@Module({
  imports: [
    ConfigModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('KEYCLOAK_AUTH_SERVER_URL'),
        realm: configService.get<string>('KC_REALM_NAME'),
        clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
        secret: configService.get<string>('KEYCLOAK_CLIENT_SECRET'),
        bearerOnly: true,
        logLevels: logLevel,
        useNestLogger: true, //if true it will use main.ts logger levels else defined level for keycloak
        //minTimeBetweenJwksRequests: 1,
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.OFFLINE,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [KeycloakConnectModule],
})
export class AuthModule {}