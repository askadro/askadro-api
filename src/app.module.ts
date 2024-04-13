import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { RouterModule } from '@nestjs/core';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    UserModule,
    RouterModule.register([{ path: 'users', module: UserModule }]),
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
