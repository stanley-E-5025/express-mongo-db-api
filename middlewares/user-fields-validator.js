import { validationResult } from "express-validator";

const UserValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array() });
  } else if (errors.isEmpty()) {
    next();
  }
};

export default UserValidator;
