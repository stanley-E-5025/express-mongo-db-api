import jwt from "jsonwebtoken";

export const routerTokenValidator = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      throw new Error("No token found, please include an authorization token");

    token = token.split(" ")[1];

    // validate token

    const { uid } = jwt.verify(token, process.env.JWT_PASSWORD);

    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
