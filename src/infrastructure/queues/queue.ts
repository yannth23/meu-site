import { Queue } from 'bull';

const queue = new Queue('games', {
  settings: {
    maxStalledCheck: 30000,
  },
});

queue.add('daily-email', {}, { repeat: { cron: '0 8 * * *' } });

export default queue;
