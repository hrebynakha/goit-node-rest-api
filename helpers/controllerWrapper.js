import { UniqueConstraintError, ValidationError } from "sequelize";
import contactsExceptions from "../exceptions/contacts.js";

const uniqueConstraintError = (error) => {
  error.status = 409;
  const errorPath = getErrorPath(error);
  if (errorPath === "email") {
    error = contactsExceptions.UniqueConstraintErrorEmail();
  } else if (errorPath === "phone") {
    error = contactsExceptions.UniqueConstraintErrorPhone();
  }
  return error;
};

const controllerWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        error = uniqueConstraintError(error);
      } else if (error instanceof ValidationError) {
        error.status = 400;
      }
      next(error);
    }
  };
  return func;
};

const getErrorPath = (error) => {
  try {
    return error.errors[0].path;
  } catch (error) {
    return "";
  }
};

export default controllerWrapper;
