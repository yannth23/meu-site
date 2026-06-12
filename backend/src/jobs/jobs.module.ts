import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module';
import { DailyEmailService } from './daily-email.service';

@Module({
  imports: [PrismaModule, EmailModule],
  providers: [DailyEmailService],
})
export class JobsModule {}