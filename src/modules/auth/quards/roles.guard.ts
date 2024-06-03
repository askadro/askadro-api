import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '@/constants/enums/roles';
import { PermissionsPower } from '@/constants/enums/permissions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLES[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPower = Math.max(...user.roles.map((role: ROLES) => this.getRolePower(role)));
    const requiredPower = Math.max(...roles.map(role => this.getRolePower(role)));

    return userPower >= requiredPower;
  }

  private getRolePower(role: ROLES): number {
    const rolePermission = PermissionsPower.find(r => r.title === role);
    return rolePermission ? rolePermission.power : 0;
  }
}
