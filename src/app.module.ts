import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';

@Module({
  imports: [
    // Global configuration module for environment variables and app settings
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Task scheduling module for cron jobs and intervals (remove this module if scheduled tasks are not needed)
    ScheduleModule.forRoot(),
    // MongoDB connection using URI from environment variables (remove this module if database is not needed)

    /* MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }), */

    // Email service configuration using SMTP transport and Handlebars templates (remove this module if email functionality is not needed)
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: config.get<string>('EMAIL_SENDER'),
        },
        template: {
          // Use a path that works in dev (src) and prod (dist) builds.
          // In dev, __dirname points to src; in prod, it points to dist.
          dir: join(__dirname, 'email-templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
