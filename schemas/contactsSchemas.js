import Joi from "joi";
const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(phoneRegex).optional(),
})
  .min(1)
  .message("Body must have at least one field");
