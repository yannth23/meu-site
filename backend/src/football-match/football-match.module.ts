import { Module } from '@nestjs/common';
import { FootballMatchService } from './football-match.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FootballMatchController } from './football-match.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FootballMatchController],
  providers: [FootballMatchService],
  exports: [FootballMatchService],
})
export class FootballMatchModule {}