import Joi from "joi";
import { phoneRegex } from "../constants/contacts.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(phoneRegex).optional(),
  favorite: Joi.boolean().optional(),
})
  .min(1)
  .message("Body must have at least one field");

export const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
