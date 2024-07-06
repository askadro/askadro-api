import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Log } from 'src/decorators/Logger';
import { AccessTokenDto } from './dto/access-token.dto';
import { HttpRequestService } from '@/modules/http-request/http-request.service';

@Injectable()
export class AccessTokenService {
  private readonly logger = new Logger(AccessTokenService.name);

  constructor(
    private readonly httpRequestService: HttpRequestService,
    private readonly configService: ConfigService,
  ) {}

  @Log()
  async getAccessToken(req: AccessTokenDto) {
    try {
      const { grant_type, client_id, client_secret, username, password } = req;

      const expectedGrantType = this.configService.get('KEYCLOAK_GRANT_TYPE');
      const expectedClientId = this.configService.get('KEYCLOAK_CLIENT_ID');
      const expectedClientSecret = this.configService.get('KEYCLOAK_CLIENT_SECRET');
      const expectedUrl = this.configService.get('KEYCLOAK_AUTH_SERVER_URL');

      const requestUrl = `${expectedUrl}/realms/${this.configService.get<string>('KC_REALM_NAME')}/protocol/openid-connect/token`;
      this.logger.log(`Request URL: ${requestUrl}`);

      const body = {
        grant_type: expectedGrantType,
        client_id: expectedClientId,
        client_secret: expectedClientSecret,
        username: username,
        password: password,
      }

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      console.log(config);

      const { data } = await this.httpRequestService.post(requestUrl, new URLSearchParams(body).toString(), config);
      console.log(data);
      const token = data.access_token;
      const expires_in = data.expires_in;

      return { token, expires_in };
    } catch (error) {
      this.logger.error(`Error: ${error.message}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
