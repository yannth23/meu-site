import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectQueue('football-queue') private readonly queue: any,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-email')
  sendEmail(): string {
    this.queue.add('send-email', {
      to: 'user@example.com',
      subject: 'Hello from NestJS!',
      text: 'Hello from NestJS!',
    });
    return 'Email sent!';
  }
}
