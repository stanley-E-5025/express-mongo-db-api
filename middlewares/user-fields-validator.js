import { validationResult } from "express-validator";

const UserValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  }
  next();
};

export default UserValidator;
