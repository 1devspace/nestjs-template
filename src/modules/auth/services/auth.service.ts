import { User, verifyToken } from '@clerk/backend';
import { createClerkClient } from '@clerk/fastify';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type UserRole = 'super-admin' | 'admin' | 'user';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly clerkClient: ReturnType<typeof createClerkClient>;
  private readonly jwtKey: string;
  private readonly apiUrl: string;

  /**
   * Creates an instance of the AuthService.
   * @param configService The service for accessing configuration.
   *
   * This constructor checks if the following environment variables are defined:
   * - CLERK_SECRET_KEY: The secret key for Clerk.
   * - CLERK_JWT_KEY: The JWT key for Clerk.
   * - API_URL: The API URL of the Fastify server.
   *
   * If any of the above variables are not defined, an error is thrown.
   */
  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');
    if (!secretKey) {
      this.logger.error(
        'CLERK_SECRET_KEY is not defined in the environment variables',
      );
      throw new Error(
        'CLERK_SECRET_KEY is not defined in the environment variables',
      );
    }

    // Initialize Clerk client using @clerk/fastify
    this.clerkClient = createClerkClient({ secretKey });

    const jwtKey = this.configService.get<string>('CLERK_JWT_KEY');
    if (!jwtKey) {
      this.logger.error(
        'CLERK_JWT_KEY is not defined in the environment variables',
      );
      throw new Error(
        'CLERK_JWT_KEY is not defined in the environment variables',
      );
    }
    this.jwtKey = jwtKey;

    const apiUrl = this.configService.get<string>('API_URL');
    if (!apiUrl) {
      this.logger.error('API_URL is not defined in the environment variables');
      throw new Error('API_URL is not defined in the environment variables');
    }
    this.apiUrl = apiUrl;
  }

  /**
   * Get user role from token
   * @param token The JWT token to verify
   * @returns The user role
   */
  async getRole(token: string): Promise<UserRole> {
    try {
      if (!token) {
        this.logger.warn('No token provided');
        throw new UnauthorizedException(
          'You should be logged in to access this resource',
        );
      }

      const result = await verifyToken(token, {
        jwtKey: this.jwtKey,
        audience: this.apiUrl,
      });

      const userId = result.sub;
      const user = await this.clerkClient.users.getUser(userId);
      const role = user.publicMetadata.role as UserRole;

      if (!role) {
        this.logger.warn('No role found in metadata');
        throw new UnauthorizedException('User role not found');
      }

      return role;
    } catch (error) {
      this.logger.error(`Verification failed: ${error.message}`);
      throw new UnauthorizedException(
        `Invalid token or role: ${error.message}`,
      );
    }
  }

  /**
   * Verify the JWT token and return the user data
   * @param token The JWT token to verify
   * @returns The user data
   */
  async verifyToken(token: string): Promise<User> {
    try {
      if (!token) {
        this.logger.warn('No token provided');
        throw new UnauthorizedException(
          'You should be logged in to access this resource',
        );
      }

      const result = await verifyToken(token, {
        jwtKey: this.jwtKey,
        audience: this.apiUrl,
      });

      const userId = result.sub;
      const user = await this.clerkClient.users.getUser(userId);

      return user;
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`);
      throw new UnauthorizedException(`Invalid token: ${error.message}`);
    }
  }
}
