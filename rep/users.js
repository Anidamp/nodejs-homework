import User from '../model/user';
/* import { randomUUID } from 'crypto';; */

const findByEmail = async email => {
  return await User.findOne({ email });
};
const findByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateUserSubscription = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    { new: true },
  );
};

const updateToken = async (id, token) => {
  return await User.findOneAndUpdate({ _id: id }, { token });
};

const updateVerify = async (id, status) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { verify: status, verificationToken: null },
  );
};
const updateAvatar = async (id, avatarURL) => {
  return await User.findOneAndUpdate({ _id: id }, { avatarURL });
};

const findById = async id => {
  return await User.findById(id);
};

export default {
  findByEmail,
  create,
  updateToken,
  updateVerify,
  updateAvatar,
  findById,
  updateUserSubscription,
  findByVerificationToken,
};