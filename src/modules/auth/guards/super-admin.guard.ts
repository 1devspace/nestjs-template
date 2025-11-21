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
export class SuperAdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * CanActivate implementation for the SuperAdminGuard.
   *
   * This method is called when a route is accessed, and it checks if the request
   * contains a valid JWT token. If the token is invalid, it throws an
   * UnauthorizedException, which is then caught by the Exceptions filter and
   * returns a 401 Unauthorized response.
   *
   * If the token is valid, it extracts the user role from the token and checks
   * if the role is 'super-admin'. If the role is not 'super-admin', it throws an
   * HttpException with a 403 Forbidden status, which is then caught by the
   * Exceptions filter and returns a 403 Forbidden response.
   *
   * If the role is 'super-admin', it returns true to allow the request to
   * continue.
   * @param context The ExecutionContext object
   * @returns A boolean indicating whether the request can continue
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
    const isSuperAdmin = user === 'super-admin';
    if (!isSuperAdmin) {
      throw new HttpException(
        'You are not authorized to access this resource',
        HttpStatus.FORBIDDEN,
      );
    }
    return isSuperAdmin;
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
