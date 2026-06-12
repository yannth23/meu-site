import { Controller, Get, Query } from '@nestjs/common';
import { FootballMatchService } from './football-match.service';

@Controller('matches')
export class FootballMatchController {
  constructor(private readonly footballMatchService: FootballMatchService) {}

  @Get()
  getTodayMatches() {
    return this.footballMatchService.getTodayMatches();
  }

  @Get('competition')
  getByCompetition(@Query('name') name: string) {
    return this.footballMatchService.getMatchesByCompetition(name);
  }

  @Get('standings')
  getStandings() {
    return this.footballMatchService.getStandings();
  }

  @Get('scorers')
  getTopScorers() {
    return this.footballMatchService.getTopScorers();
  }
}