import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';
import { Token } from 'src/auth/models/token.model';

interface RequestWithUser extends Request {
  user: Token;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = req;

    const isAuth = roles.includes(user.role as Role);

    if (!isAuth) throw new ForbiddenException('Forbidden role');

    return isAuth;
  }
}
