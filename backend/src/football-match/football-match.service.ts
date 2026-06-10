// backend/src/football-match/football-match.service.js
import { InjectRepository } from '@nestjs/typeorm';
import { FootballMatchEntity } from './football-match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FootballMatchService {
  constructor(
    @InjectRepository(FootballMatchEntity) private readonly footballMatchRepository: Repository<FootballMatchEntity>
  ) {}

  async getTodayMatches(): Promise<FootballMatch[]> {
    // Fetch matches for the current day from a soccer API. This is where you'll integrate with your chosen external API, e.g., SportRadar or OpenLigaNet. Ensure to cache these results in Redis as per requirement #4.
    const today = new Date().toISOString().split('T')[0]; // Get the current date for filtering matches by day of year and month only (YYYY-MM)
    
    return this.footballMatchRepository.find({ where: 'date_played geq :today, competition ILIKE "FIRST LEAGUE OF LONDON" });
  }
}
