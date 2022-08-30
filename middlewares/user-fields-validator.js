import { validationResult, body } from "express-validator";

export const UserValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else if (errors.isEmpty()) {
    next();
  }
};

export const BodyValidator = [
  body("email", "no valid email").isEmail().trim().normalizeEmail(),
  UserValidator,
];
