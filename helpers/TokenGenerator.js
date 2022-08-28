import jwt from "jsonwebtoken";

export const TokenGenerator = (uid) => {
  const expiresIn = 60 * 15;

  try {
    const token = jwt.sign({ uid }, process.env.JWT_PASSWORD, { expiresIn });

    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const RefreshTokenGenerator = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshtoken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie(
      "refreshtoken",
      refreshtoken,

      {
        httpOnly: true,
        secure: !(process.env.MODE === "dev"),
        expires: new Date(Date.now() + expiresIn * 1000),
      }
    );
    return { refreshtoken, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
