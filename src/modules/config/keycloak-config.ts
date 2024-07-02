import * as process from 'node:process';
import KcAdminClient from '@keycloak/keycloak-admin-client';

  const adminClientData = {
    baseUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080',
    realmName: process.env.KEYCLOAK_REALM,
    username: 'admin',
    password: '24262060',
    grantType: 'password',
    clientId: 'admin-cli'
  }

