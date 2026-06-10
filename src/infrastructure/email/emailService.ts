import { sendMail } from 'resend';

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await sendMail({
      from: 'your-email@example.com',
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
