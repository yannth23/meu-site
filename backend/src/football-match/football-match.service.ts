import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

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

  async getStandings() {
    const response = await axios.get(
      'https://v3.football.api-sports.io/standings',
      {
        params: { league: 1, season: 2026 },
        headers: {
          'x-apisports-key': process.env.API_FOOTBALL_KEY,
        },
      },
    );

    const standings =
      response.data.response[0]?.league?.standings[0] ?? [];

    return standings.map((team: any) => ({
      position: team.rank,
      teamId: team.team.id,
      teamName: team.team.name,
      points: team.points,
      played: team.all.played,
      wins: team.all.win,
      draws: team.all.draw,
      losses: team.all.lose,
      goalsFor: team.all.goals.for,
      goalsAgainst: team.all.goals.against,
    }));
  }

  async getTopScorers() {
    const response = await axios.get(
      'https://v3.football.api-sports.io/players/topscorers',
      {
        params: { league: 1, season: 2026 },
        headers: {
          'x-apisports-key': process.env.API_FOOTBALL_KEY,
        },
      },
    );

    return response.data.response.map((entry: any) => ({
      playerId: entry.player.id,
      playerName: entry.player.name,
      teamName: entry.statistics[0].team.name,
      goals: entry.statistics[0].goals.total,
    }));
  }
}