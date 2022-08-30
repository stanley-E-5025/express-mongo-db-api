import jwt from "jsonwebtoken";


export const RefreshTokenValidator = (req, res, next) => {
  try {
    const cookieToken = req.cookies.refreshtoken;
    if (!cookieToken) throw new Error("token not exist");

    // If the token exist. Validate it
    const { uid } = jwt.verify(cookieToken, process.env.JWT_REFRESH);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
  }
};
