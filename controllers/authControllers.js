import authServices from "../services/authServices.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { saveAvatar, createAvatarUrl } from "../helpers/avatar.js";
import authExceptions from "../exceptions/auth.js";

export const registerController = async (req, res) => {
  const avatarURL = createAvatarUrl(req.body.email);
  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

export const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.sendStatus(204);
};

export const getCurrentUserController = async (req, res) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

export const updateSubscriptionController = async (req, res) => {
  const updatedUser = await authServices.updateSubscription({
    user: req.user,
    data: req.body,
  });
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

export const updateAvatarController = async (req, res) => {
  const avatar = await saveAvatar(req.file);
  const { avatarURL } = await authServices.updateAvatar({
    user: req.user,
    data: { avatar },
  });
  res.json({ avatarURL });
};

export const verifyController = async (req, res) => {
  const user = await authServices.findUser({
    verificationToken: req.params.verificationToken,
  });
  if (!user || !user.verificationToken)
    throw authExceptions.userNotFound({ status: 404 });

  await authServices.verifyUser(user);
  res.json({
    message: "Verification successful",
  });
};

export const resendVerificationController = async (req, res) => {
  const user = await authServices.findUser({ email: req.body.email });
  if (!user) throw authExceptions.userNotFound({ status: 404 });
  if (user.verify) throw authExceptions.userAlreadyVerified({ status: 400 });

  await authServices.resendVerification(user);
  res.json({
    message: "Verification email sent",
  });
};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  logoutController: controllerWrapper(logoutController),
  getCurrentUserController: controllerWrapper(getCurrentUserController),
  updateSubscriptionController: controllerWrapper(updateSubscriptionController),
  updateAvatarController: controllerWrapper(updateAvatarController),
  verifyController: controllerWrapper(verifyController),
  resendVerificationController: controllerWrapper(resendVerificationController),
};
