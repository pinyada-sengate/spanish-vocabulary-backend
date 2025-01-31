import { body, query } from "express-validator";

import User from "../models/User";

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
    return [
      query("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (user) {
              req.user = user;
              return true;
            } else {
              throw new Error("User does not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      query("password", "Password is required").isAlphanumeric(),
    ];
  }
}
