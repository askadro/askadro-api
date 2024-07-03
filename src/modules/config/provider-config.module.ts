import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[ProviderConfigModule,HttpModule],
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class ProviderConfigModule {}