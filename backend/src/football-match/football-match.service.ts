// backend/src/football-match/football-match.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class FootballMatchService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodayMatches() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.footballMatch.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async getMatchesByCompetition(competition: string) {
    return this.prisma.footballMatch.findMany({
      where: {
        championship: {
          contains: competition,
          mode: 'insensitive',
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}