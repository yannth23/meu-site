import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FootballMatch } from './football-match.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FootballMatch)
    private readonly footballMatchRepository: Repository<FootballMatch>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getFootballMatches(): Promise<FootballMatch[]> {
    return this.footballMatchRepository.find();
  }
}
