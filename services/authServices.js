import User from "../models/User.js";
import { createToken } from "../helpers/jwt.js";
import { hashPassword, comparePassword } from "../helpers/pwd.js";
import authExceptions from "../exceptions/auth.js";
import { createVerificationToken } from "../helpers/verificationToken.js";
import { sendVerificationEmail } from "../services/emailServices.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (data) => {
  const hashedPassword = await hashPassword(data.password);
  const verificationToken = createVerificationToken();
  await sendVerificationEmail({
    to: data.email,
    verificationToken,
  });
  return User.create({ ...data, password: hashedPassword, verificationToken });
};

export const resendVerification = async (user) => {
  const verificationToken = createVerificationToken();
  await sendVerificationEmail({
    to: user.email,
    verificationToken,
  });
  user.verificationToken = verificationToken;
  await user.save();
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) throw authExceptions.emailOrPasswordInvalid();

  const passwordCompare = await comparePassword(password, user.password);
  if (!passwordCompare) throw authExceptions.emailOrPasswordInvalid();

  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  user.token = token;
  await user.save();
  return { token, user };
};

export const logoutUser = async (user) => {
  user.token = null;
  await user.save();
};

export const updateSubscription = async ({ user, data }) => {
  user.subscription = data.subscription;
  await user.save();
  return user;
};

export const updateAvatar = async ({ user, data }) => {
  user.avatarURL = data.avatar;
  await user.save();
  return user;
};

export const verifyUser = async (user) => {
  user.verify = true;
  user.verificationToken = null;
  await user.save();
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  updateSubscription,
  updateAvatar,
  findUser,
  verifyUser,
  resendVerification,
};
