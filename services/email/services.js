import Mailgen from 'mailgen';

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case 'development':
        this.link = 'http://localhost:5000';
        break;
      case 'test':
        this.link = 'http://localhost:5000';
        break;
      case 'production':
        this.link = 'https://app-contacts-goit.herokuapp.com/';
        break;
      default:
        this.link = 'http://localhost:5000';
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Contact App',
        link: this.link,
      },
    });

    const email = {
      body: {
        name: username,
        intro: "Welcome!",
        action: {
          instructions: 'To get started with our API, please click here:',
          button: {
            color: '#70A350',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro: `Or copy and paste this link to your browser: ${this.link}/api/users/verify/${verifyToken}`,
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const msg = {
      to: email,
      subject: 'Verify email',
      html: emailBody,
    };
    try {
      const result = await this.sender.send(msg);

      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default EmailService;