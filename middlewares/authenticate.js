import { findUser } from "../services/authServices.js";

import { verifyToken } from "../helpers/jwt.js";
import authExceptions from "../exceptions/auth.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(authExceptions.authorizationHeaderMissing());
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    return next(authExceptions.authorizationHeaderNotBearer());

  const { payload, error } = verifyToken(token);
  if (error) return next(authExceptions.AuthError({ message: error.message }));
  const user = await findUser({ id: payload.id });
  if (!user || !user.token || !user.verify)
    return next(authExceptions.userNotFound());
  if (user.token !== token) return next(authExceptions.invalidToken());
  req.user = user;
  next();
};
export default authenticate;
