import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class DailyEmailService {
  private readonly logger = new Logger(DailyEmailService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  // 8h UTC = 5h Brasília. Para 8h Brasília use '0 11 * * *'
  @Cron('0 8 * * *', { name: 'daily-email-job' })
  async runDailyEmailJob(): Promise<void> {
    this.logger.log('Starting daily email job...');

    const users = await this.prisma.user.findMany({
      where: {
        preferences: { receiveDailyNotifications: true },
      },
      include: { favoriteTeams: true },
    });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const matches = await this.prisma.footballMatch.findMany({
      where: { date: { gte: startOfDay, lte: endOfDay } },
      orderBy: { date: 'asc' },
    });

    let sent = 0;
    let skipped = 0;

    for (const user of users) {
      const favoriteTeams = user.favoriteTeams.map((t) => t.teamName);

      const filteredMatches = matches.filter(
        (m) => favoriteTeams.includes(m.team1) || favoriteTeams.includes(m.team2),
      );

      if (!filteredMatches.length) {
        skipped++;
        continue;
      }

      try {
        await this.emailService.sendDailyEmail(user.email, buildEmailHtml(filteredMatches));
        sent++;
      } catch (err) {
        this.logger.error(`Failed to send email to ${user.email}`, err);
      }
    }

    this.logger.log(`Done — sent: ${sent}, skipped: ${skipped}`);
  }
}

function buildEmailHtml(
  matches: { team1: string; team2: string; championship: string; date: Date }[],
): string {
  const rows = matches
    .map(
      (m) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${m.championship}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${m.team1} vs ${m.team2}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">
          ${m.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </td>
      </tr>`,
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#16a34a;">⚽ GoalAlert — Partidas de Hoje</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:8px 12px;text-align:left;">Competição</th>
            <th style="padding:8px 12px;text-align:left;">Jogo</th>
            <th style="padding:8px 12px;text-align:left;">Horário</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="color:#999;font-size:12px;margin-top:24px;">
        Para cancelar notificações, acesse suas preferências no GoalAlert.
      </p>
    </div>
  `;
}