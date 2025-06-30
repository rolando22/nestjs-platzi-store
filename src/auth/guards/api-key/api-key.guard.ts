import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

import appConfig from '../../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(appConfig.KEY) private config: ConfigType<typeof appConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    const isAuth = apiKey === this.config.apiKey;

    if (!isAuth) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
