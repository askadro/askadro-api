import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [JobsModule], // jobs modul içeriğini kullanmamızı sağlar
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
