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
const userAlreadyVerified = ({
  status = 400,
  message = "Verification has already been passed",
}) => {
  return AuthError({ status, message });
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
};
