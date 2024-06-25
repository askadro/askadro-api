import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '@/constants/enums/roles';
import { PermissionsPower } from '@/constants/enums/permissions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLES[]>('roles', context.getHandler());
    console.error("roles: ",roles);
    if (!roles) {
      throw new UnauthorizedException('Yetkiniz yok');
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Giriş yapılmamış'); // Kullanıcı yoksa hata fırlatın
    }

    const userPower = Math.max(...user.roles.map((role: ROLES) => this.getRolePower(role)));
    const requiredPower = Math.max(...roles.map(role => this.getRolePower(role)));

    return userPower >= requiredPower;
  }

  private getRolePower(role: ROLES): number {
    const rolePermission = PermissionsPower.find(r => r.title === role);
    return rolePermission ? rolePermission.power : 0;
  }
}
