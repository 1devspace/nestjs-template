import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * This guard will check if the user is an admin, if not it will throw an ForbiddenException.
   * If the token is not provided, it will throw an UnauthorizedException.
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    const user = await this.authService.getRole(token);
    const isAdmin = user === 'admin' || user === 'super-admin';
    if (!isAdmin) {
      throw new HttpException(
        'You are not authorized to access this resource',
        HttpStatus.FORBIDDEN,
      );
    }
    return isAdmin;
  }
  /**
   * Extracts the token from the Authorization header of the given request.
   * It assumes the header is in the format "Bearer <token>".
   * If the header is not present or is not in the correct format, it returns undefined.
   * @param request The request object
   * @returns The extracted token or undefined if it couldn't be extracted
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
