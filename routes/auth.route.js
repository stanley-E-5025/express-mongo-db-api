import expres from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import UserValidator from "../middlewares/user-fields-validator.js";

const router = expres.Router();

router.post(
  "/register",
  [
    body("email", "no valid email").isEmail().trim().normalizeEmail(),

    body("password", "password should have 10 letters")
      .trim()
      .isLength({ min: 10 }),
  ],
  UserValidator,
  register
);
router.post(
  "/login",
  [body("email", "no valid email").isEmail().trim().normalizeEmail()],

  UserValidator,
  login
);

export default router;
