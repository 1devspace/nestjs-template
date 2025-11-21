import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  /**
   * Creates an instance of the MailService.
   * @param mailerService The Mailer service for sending emails
   * @param configService The service for accessing configuration
   */
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  /**
   * Sends an email to the given email address with a link to the login URL.
   * @param email The email address to send the email to
   * @param firstName The first name of the user
   * @param lastName The last name of the user
   */
  async sendEmail(
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    // Get the login URL from the configuration
    const loginUrl = this.configService.get<string>('FRONTEND_LOGIN_URL');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your email subject',
      // Path to the template file in email-templates folder (.hbs extension is automatically added)
      template: './email',
      // Variables passed to the template for dynamic content rendering
      context: {
        email,
        firstName,
        lastName,
        actionUrl: loginUrl,
      },
    });
  }
}
