import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
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
    const cookieToken = req.cookies.refreshtoken;

    if (!cookieToken) throw new Error("token not exist");

    const { uid } = jwt.verify(cookieToken, process.env.JWT_REFRESH);

    const { token, expiresIn } = TokenGenerator(uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
  }
};
