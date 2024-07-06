import { Body, Controller, Post } from '@nestjs/common';
import { Public, Resource, Unprotected } from 'nest-keycloak-connect';
import { AccessTokenService } from './access-token.service';
import { AccessTokenDto } from './dto/access-token.dto';

@Resource('token')
@Controller('token')
export class AccessTokenController {
  constructor(private accessTokenService: AccessTokenService) {}

  @Post()
  @Public()
  getAccessToken(@Body() req: AccessTokenDto) {
    console.log("burasıo");
    return this.accessTokenService.getAccessToken(req);
  }
}
