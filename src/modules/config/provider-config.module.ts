import { Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service';

@Module({
  imports:[ProviderConfigModule],
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class ProviderConfigModule {}