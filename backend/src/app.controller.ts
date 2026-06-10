// backend/src/app.controller.js
import { Controller, Get } from '@nestjs/common';
import { FootballMatchService } from './football-match.service';

@Controller()
export class AppController {
  constructor(private readonly footballMatchService: FootballMatchService) {}

  @Get('matches')
  async getTodayMatches(): Promise<FootballMatch[]> {
    return this.footballMatchService.getTodayMatches(); // This method should fetch matches for the current day from a soccer API and cache them in Redis before returning to avoid multiple external calls.
  }
}
