import jwt from 'jsonwebtoken';
import UsersRepository from '../../rep/users';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await UsersRepository.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, name, email, subscription, avatarURL, verificationToken } =
      await UsersRepository.create(body);
    return {
      id,
      name,
      email,
      subscription,
      avatarURL,
      verificationToken,
    };
  }

  async getUser(email, password) {
    const user = await UsersRepository.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user.verify) {
      return null;
    }
    return user;
  }

  async getUserVerifyToken(email) {
    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async isUserVerified(verificationToken) {
    const userByVerTOken = await UsersRepository.findByVerificationToken(
      verificationToken,
    );

    const status = !!userByVerTOken;
    if (status) {
      await UsersRepository.updateVerify(userByVerTOken.id, status);
    }
    return status;
  }

  async updateUserSubscription(id, subscription) {
    const user = await UsersRepository.updateUserSubscription(id, subscription);
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8d' });
    return token;
  }

  async setToken(id, token) {
    await UsersRepository.updateToken(id, token);
  }
}

export default new AuthService();