import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { AccessTokenController } from './access-token.controller';
import { AccessTokenService } from './access-token.service';
import { HttpRequestService } from '@/modules/http-request/http-request.service';

@Module({
  imports: [HttpModule],
  controllers: [AccessTokenController],
  providers: [AccessTokenService, Logger, HttpRequestService],
  exports: [AccessTokenService],
})
export class AccessTokenModule {}