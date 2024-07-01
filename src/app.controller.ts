import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDto } from '@/modules/as-mailer/dto/send-email.dto';
import { AsMailerService } from '@/modules/as-mailer/as-mailer.service';
import { Roles } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly asMailerService: AsMailerService) {
  }

  @Roles({ roles: ["user"] })
  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  // @Post('/send-email')
  // sendEmail(@Body() sendEmail: SendEmailDto,
  // ): Promise<any> {
  //
  //   return this.asMailerService.sendEmail(sendEmail);
  // }
}
