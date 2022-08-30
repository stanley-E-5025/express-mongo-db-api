import expres from "express";
import {login,register,userInfo,refreshToken,logOut} from "../controllers/auth.controller.js";
import { BodyValidator } from "../middlewares/user-fields-validator.js";
import { routerTokenValidator } from "../middlewares/route-token-validator.js";
import { RefreshTokenValidator } from "../middlewares/route-refresh-token-validator.js";

const router = expres.Router();

router.post("/register", BodyValidator, register);
router.post("/login", BodyValidator, login);
router.get("/user", routerTokenValidator, userInfo);
router.get("/refresh", RefreshTokenValidator, refreshToken);
router.get("/logout", logOut);

export default router;
