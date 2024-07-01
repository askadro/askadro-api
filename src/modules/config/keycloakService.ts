import * as KeycloakInterface from 'keycloak-js';
import {
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
} from 'keycloak-js';
import { from, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

export interface ConfigOptions {
  clientId: string;
  realm: string;
  url: string;
}
const Keycloak = (KeycloakInterface as any).default || KeycloakInterface;

@Injectable()
export class KeycloakService {

}