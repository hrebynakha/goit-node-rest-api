import HttpError from "./HttpError.js";

const AuthError = ({ status = 401, message = "Unauthorized" }) => {
  return HttpError(status, message);
};
const emailOrPasswordInvalid = () => {
  return AuthError({ message: "Email or password invalid" });
};
const authorizationHeaderMissing = () => {
  return AuthError({ message: "Authorization header missing" });
};
const authorizationHeaderNotBearer = () => {
  return AuthError({ message: "Authorization header not Bearer" });
};
const userNotFound = () => {
  return AuthError({ message: "User not found" });
};

export default {
  AuthError,
  emailOrPasswordInvalid,
  authorizationHeaderMissing,
  authorizationHeaderNotBearer,
  userNotFound,
};
