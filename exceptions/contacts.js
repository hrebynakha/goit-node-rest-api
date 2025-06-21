import HttpError from "./HttpError.js";

const UniqueConstraintErrorPhone = () => {
  return HttpError(409, "Phone number must be unique");
};

const UniqueConstraintErrorEmail = () => {
  return HttpError(409, "Email must be unique");
};

export default {
  UniqueConstraintErrorPhone,
  UniqueConstraintErrorEmail,
};
