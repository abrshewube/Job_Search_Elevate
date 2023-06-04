import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError(
      "Authentication attempt has failed, likely due to invalid authentication headers!"
    );
  }
  // Split method and turn authHeader into an array, split on the whitespace and grab the second value(which will be the token)
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user request object
    req.user = { userId: payload.userId };
    // req.user = payload // alternative
    next();
  } catch (error) {
    throw new UnAuthenticatedError(
      "Authentication attempt has failed, likely due to invalid authentication headers!"
    );
  }
};

export default auth;
