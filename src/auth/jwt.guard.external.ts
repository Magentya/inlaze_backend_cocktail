// Libraries
import {
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { to } from 'await-to-js';
import { timeout, lastValueFrom } from 'rxjs';

// Auth Guard for connect to Auth microservice
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('MICROSERVICE_TRANSFER')
    private readonly appMicroservice: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get request context
    const req = context.switchToHttp().getRequest();

    // Send accessToken to validate auth microservice
    const [errorValidate, response] = await to(
      lastValueFrom(
        this.appMicroservice
          .send('validateToken', {
            accessToken: req.headers['authorization']?.split(' ')[1],
          })
          .pipe(timeout(5000)),
      ),
    );

    // SET response USER to request
    req.user = response;

    if (errorValidate) {
      throw new UnauthorizedException(errorValidate);
    }

    return true;
  }
}
