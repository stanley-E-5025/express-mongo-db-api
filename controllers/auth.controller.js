import { User } from "../models/User.js";
import {
  RefreshTokenGenerator,
  TokenGenerator,
} from "../helpers/TokenGenerator.js";

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      res.status(400).json({
        error: "this user don't exist ",
      });

    const { token, expiresIn } = TokenGenerator(user.id);
    RefreshTokenGenerator(user.id, res);
    return res.json({ token, expiresIn });
  } catch (error) {}
};

export const register = async (req, res) => {
  const { email, username } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) throw { code: 400 };
    else {
      user = new User({
        email,
        username,
      });

      user.save();
      res.json({
        ok: true,
      });
    }
  } catch (error) {
    if (error.code === 400) {
      return res.status(400).json({
        error: "email already in use",
      });
    }

    return res.status(500).json({
      error: "server error",
    });
  }
};

export const userInfo = async (req, res) => {
  try {
    let user = await User.findById(req.uid).lean();

    return res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { token, expiresIn } = TokenGenerator(req.uid);

    // return the token to the response
    return res.json({ token, expiresIn });
    
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("refreshtoken");
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};
