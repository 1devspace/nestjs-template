import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Server, ServerOptions } from 'socket.io';

// Load environment variables from .env file
dotenv.config();

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/Exceptions.filter';

/**
 * Custom Socket.IO adapter that extends the default IoAdapter.
 * Configures CORS settings for WebSocket connections based on environment variables.
 */
export class SocketAdapter extends IoAdapter {
  /**
   * Creates and configures a Socket.IO server instance.
   * Parses allowed origins from BASE_URL environment variable and applies CORS settings.
   *
   * @param port The port number for the Socket.IO server
   * @param options Additional server options including namespace and server instance
   * @returns Configured Socket.IO server instance
   */
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ): any {
    // Parse comma-separated list of allowed origins from environment variable
    const origins = process.env.BASE_URL
      ? process.env.BASE_URL.split(',').map((url) => url.trim())
      : [];

    return super.createIOServer(port, {
      ...options,
      cors: {
        origin: origins,
        methods: ['GET', 'POST'],
      },
    });
  }

  /**
   * Bind a callback function to the "connection" event on the given server.
   *
   * @param server The server to bind the callback to.
   * @param callback The callback to be invoked when a client connects.
   */
  bindClientConnect(server: Server, callback: (socket: any) => void): void {
    server.on('connection', callback);
  }
}

/**
 * Application bootstrap function - Main entry point for the NestJS application.
 * Configures and initializes:
 * - Fastify server with custom adapters and body size limits
 * - CORS for cross-origin requests
 * - Security headers via Helmet
 * - File upload support via Multipart
 * - Static file serving
 * - API documentation via Swagger
 * - Global validation pipes, exception filters, and interceptors
 * - WebSocket support (optional)
 */
async function bootstrap(): Promise<void> {
  // Create NestJS application with Fastify adapter for better performance
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 5 * 1024 * 1024, // Set maximum request body size to 5MB
    }),
    {
      rawBody: true, // Enable raw body for webhook signatures and similar use cases
      bodyParser: true, // Enable automatic body parsing
    },
  );

  // Parse multiple URLs from BASE_URL environment variable for CORS configuration
  const origins = process.env.BASE_URL
    ? process.env.BASE_URL.split(',').map((url) => url.trim())
    : [];

  // === Fastify Plugin Registration ===

  // Register multipart/form-data support for file uploads
  await app.register(fastifyMultipart, {
    limits: {
      fieldSize: 5 * 1024 * 1024, // Maximum field size of 5MB for file uploads
    },
  });

  // Configure CORS (Cross-Origin Resource Sharing) to allow requests from specified origins
  await app.register(fastifyCors, {
    origin: origins, // Allowed origins from environment variable
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'], // Allowed request headers
    credentials: true, // Allow cookies and authentication headers
  });

  // Configure Helmet for security headers (protection against common vulnerabilities)
  await app.register(fastifyHelmet, {
    // Content Security Policy: disabled by default to avoid blocking Swagger UI
    // Set ENABLE_CSP=true in production environment to enable strict CSP
    contentSecurityPolicy:
      process.env.ENABLE_CSP === 'true' ? undefined : false,
    // Clickjacking protection: only allow same-origin framing
    frameguard: { action: 'sameorigin' },
    // Referrer policy: don't send referrer information
    referrerPolicy: { policy: 'no-referrer' },
    // Cross-Origin Resource Policy: only allow same-origin requests
    crossOriginResourcePolicy: { policy: 'same-origin' },
    // Hide X-Powered-By header to obscure technology stack
    hidePoweredBy: true,
    // HTTP Strict Transport Security: only enable in production to avoid localhost issues
    hsts: process.env.NODE_ENV === 'production' ? undefined : false,
  });

  // Register static file serving for assets, uploads, and public files
  await app.register(fastifyStatic, {
    root: process.cwd(), // Serve files from the project root directory
    prefix: '/public/', // Mount static files under /public/ URL path
  });

  // === Root Level Routes (non-prefixed) ===

  // Welcome endpoint - provides basic API information
  app.getHttpAdapter().get('/', async (_request, _reply) => {
    return { message: 'Welcome to App Name API' };
  });

  // Health check endpoint - useful for monitoring and load balancers
  app.getHttpAdapter().get('/health', async (_request, _reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(), // Server uptime in seconds
    };
  });

  // === Global Configuration ===

  // Apply 'api' prefix to all routes (e.g., /api/users, /api/auth)
  // Root routes like / and /health remain unprefixed
  app.setGlobalPrefix('api');

  // Enable automatic validation for all DTOs using class-validator decorators
  app.useGlobalPipes(new ValidationPipe());

  // === Swagger API Documentation ===

  // Configure Swagger/OpenAPI documentation
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT Bearer token authentication in Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Make Swagger UI available at /api/docs
  SwaggerModule.setup('api/docs', app, document);

  // === Global Error Handling and Data Transformation ===

  // Apply custom exception filter for consistent error responses
  app.useGlobalFilters(new AllExceptionsFilter());
  // Apply class serialization to automatically transform response objects
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // === Server Startup ===

  // Start the server on the specified port (default: 3001)
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Listen on all network interfaces
}

// Initialize and start the application
void bootstrap().then(() =>
  console.info(`API is running on port ${process.env.PORT || 3001}`),
);
