import { Queue } from 'bull';

const queue = new Queue('games', {
  settings: {
    maxStalledCheck: 30000,
  },
});

queue.on('error', (error) => {
  console.error('Error in queue:', error);
});

export default queue;
