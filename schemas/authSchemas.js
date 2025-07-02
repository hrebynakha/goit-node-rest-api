import Joi from "joi";
import { emailRegexp } from "../constants/global.js";
import { subscriptions } from "../constants/auth.js";

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptions)
    .required(),
});

export const resendVerificationSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
