import { sendMail } from 'resend';

const sendDailyEmail = async () => {
  try {
    const games = await cacheService.getGame(new Date().toISOString());
    const subscribers = await getSubscribersFromDB();
    subscribers.forEach((subscriber) => {
      sendEmail(subscriber.email, 'Daily Soccer Games', games);
    });
  } catch (error) {
    console.error('Error sending daily email:', error);
  }
};

export default sendEmail;
