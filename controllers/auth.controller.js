import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      res.status(400).json({
        error: "this user don't exist ",
      });

    // create JWT
    const token = jwt.sign({ uid: user._id }, process.env.JWT_PASSWORD);
    res.json({
      token,
    });
  } catch (error) {}
};

export const register = async (req, res) => {
  const { email, username } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) throw { code: 400 };

    user = new User({
      email,
      username,
    });

    user.save();
    res.json({
      ok: true,
    });
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
