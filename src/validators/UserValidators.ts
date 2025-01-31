import { body } from "express-validator";

export class UserValidators {
  static signup() {
    return [
      body("username", "Username is requied").isString(),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 - 20 characters"),
    ];
  }

  static login() {
    return [];
  }
}
