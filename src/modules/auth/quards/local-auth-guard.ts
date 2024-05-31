import { Injectable, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // constructor(private authService: AuthService) {
  //   super();
  // }
  //
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const { username, password } = request.body;
  //
  //   if(!username || !password) {
  //     throw new BadRequestException("Incomplete information")
  //   }
  //
  //   const auth = await this.authService.validateAuth(username, password);
  //   if (!auth) {
  //     throw new UnauthorizedException();
  //   }
  //
  //   request.auth = auth;
  //   return true;
  // }
}
