import { Module } from '@nestjs/common';
import { AsMailerService } from './as-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        // defaults: {
        //   from: '"Hakan" <hakan1@askadrovip.com>',
        // },
        preview: false,
      }),

    }),
  ],
  providers: [AsMailerService, ConfigService],
})
export class AsMailerModule {
}
