import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    RouterModule.register([{ path: 'users', module: UserModule }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
