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
const userNotFound = ({ status = 401, message = "User not found" }) => {
  return AuthError({ status, message });
};

const userAlreadyVerified = () => {
  return HttpError(400, "Verification has already been passed");
};
const userNotVerified = () => {
  return HttpError(400, "User not verified");
};
const invalidToken = () => {
  return AuthError({ message: "Invalid token" });
};

export default {
  AuthError,
  emailOrPasswordInvalid,
  authorizationHeaderMissing,
  authorizationHeaderNotBearer,
  userNotFound,
  invalidToken,
  userAlreadyVerified,
  userNotVerified,
};
