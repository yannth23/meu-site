import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FootballApiService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async syncTodayMatches() {
    const today = new Date().toISOString().split('T')[0];

    const response = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          date: today,
        },
        headers: {
          'x-apisports-key': process.env.API_FOOTBALL_KEY,
        },
      },
    );

    const fixtures = response.data.response;

    for (const fixture of fixtures) {
      await this.prisma.footballMatch.upsert({
        where: {
          externalId: fixture.fixture.id.toString(),
        },
        update: {
          status: fixture.fixture.status.short,
        },
        create: {
          externalId: fixture.fixture.id.toString(),
          date: new Date(fixture.fixture.date),
          championship: fixture.league.name,
          homeTeam: fixture.teams.home.name,
          awayTeam: fixture.teams.away.name,
          status: fixture.fixture.status.short,
        },
      });
    }

    return {
      synced: fixtures.length,
    };
  }
}