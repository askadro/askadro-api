import { Module } from '@nestjs/common';
import { AsMailerService } from './as-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import * as Handlebars from 'handlebars';

Handlebars.registerHelper('calculateAge', function (birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
});
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const templatesDir = join(__dirname, 'mail-templates');
        console.log('Templates Directory:', templatesDir);
        return {

          transport: {
            host: config.get('MAIL_HOST'),
            port: config.get('MAIL_PORT'),
            secure: true,
            auth: {
              user: config.get('MAIL_USERNAME'),
              pass: config.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"${config.get<string>('MAIL_FROM_NAME')}" <${config.get<string>('MAIL_FROM_ADDRESS')}>`,
          },
          // preview: false,
          template: {
            dir: "../askadro-api/src/constants/mail/templates",
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      },

    }),
  ],
  providers: [AsMailerService, ConfigService],
})
export class AsMailerModule {
}
