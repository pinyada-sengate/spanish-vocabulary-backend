import { body } from "express-validator";

import User from "../models/User";

export class UserValidators {
  static signup() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom(async (email, { req }) => {
          try {
            const user = await User.findOne({
              email,
            });

            if (user) {
              throw new Error("User already exists");
            } else {
              return true;
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be between 8 - 20 characters"),
      body("name", "Name is requied").isString(),
      body("image", "Image is required").custom((image, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("User's image is required");
        }
      }),
    ];
  }

  static login() {
    return [
      body("email", "Email is required")
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
      body("password", "Password is required").isAlphanumeric(),
    ];
  }
}
