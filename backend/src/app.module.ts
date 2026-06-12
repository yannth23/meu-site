import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';
import { JobsModule } from './jobs/jobs.module';
import { FootballMatchModule } from './football-match/football-match.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    EmailModule,
    JobsModule,
    FootballMatchModule,
  ],
  controllers: [AppController],
})
export class AppModule {}