import authServices from "../services/authServices.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import { saveAvatar, createAvatarUrl } from "../helpers/avatar.js";

const registerController = async (req, res) => {
  const avatarURL = await createAvatarUrl(req.body.email);
  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);
  res.sendStatus(204);
};

const getCurrentUserController = async (req, res) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL,
  });
};

const updateSubscriptionController = async (req, res) => {
  const updatedUser = await authServices.updateSubscription({
    user: req.user,
    data: req.body,
  });
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatarController = async (req, res) => {
  const avatar = await saveAvatar(req.file);
  const { avatarURL } = await authServices.updateAvatar({
    user: req.user,
    data: { avatar },
  });
  res.json({ avatarURL });
};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  logoutController: controllerWrapper(logoutController),
  getCurrentUserController: controllerWrapper(getCurrentUserController),
  updateSubscriptionController: controllerWrapper(updateSubscriptionController),
  updateAvatarController: controllerWrapper(updateAvatarController),
};
