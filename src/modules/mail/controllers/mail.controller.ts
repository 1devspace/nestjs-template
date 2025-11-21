import { Controller } from '@nestjs/common';

import { MailService } from '../services/mail.service';

@Controller('email')
export class MailController {
  constructor(private readonly mailService: MailService) {}
}
