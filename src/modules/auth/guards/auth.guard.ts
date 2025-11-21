import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * CanActivate implementation for the AuthGuard.
   *
   * This method is called when a route is accessed, and it checks if the request
   * contains a valid JWT token. If the token is invalid, it throws an
   * UnauthorizedException, which is then caught by the Exceptions filter and
   * returns a 401 Unauthorized response.
   *
   * If the token is valid, it attaches the entire payload to the request object
   * under the `user` property, and then returns true to allow the request to
   * continue.
   * @param context The ExecutionContext object
   * @returns A boolean indicating whether the request can continue
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'You should be logged in to access this resource',
      );
    }

    try {
      // Verify token and get the payload
      const payload = await this.authService.verifyToken(token);

      // Attach the entire payload to the request object
      request.user = payload;

      return true;
    } catch (error) {
      console.error('Token verification error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
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
