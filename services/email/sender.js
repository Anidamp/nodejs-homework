import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

class SenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    return await sgMail.send({ ...msg, from: process.env.SENDER_SENDGRID });
  }
}

class SenderNodemailer {
  async send(msg) {
    const config = {
      host: 'smtp.ukr.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_NODEMAILER,
        pass: process.env.PASS_NODEMAILER,
      },
    };
    const transporter = nodemailer.createTransport(config);
    return await transporter.sendMail({
      ...msg,
      from: process.env.SENDER_NODEMAILER,
    });
  }
}

export { SenderNodemailer, SenderSendgrid };