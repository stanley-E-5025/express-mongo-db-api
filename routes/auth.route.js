import expres from "express";
import { login, register, userInfo ,refreshToken } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import UserValidator from "../middlewares/user-fields-validator.js";
import { routerTokenValidator } from "../middlewares/route-token-validator.js";

const router = expres.Router();

router.post(
  "/register",
  [body("email", "no valid email").isEmail().trim().normalizeEmail()],
  UserValidator,
  register
);
router.post(
  "/login",
  [body("email", "no valid email").isEmail().trim().normalizeEmail()],
  UserValidator,
  login
);

router.get("/user", routerTokenValidator, userInfo);
router.get("/refresh" , refreshToken)

export default router;
