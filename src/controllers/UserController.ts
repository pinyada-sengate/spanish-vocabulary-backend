import User from "../models/User";
import { Utils } from "../utils/Utils";

export class UserController {
  static async signup(req, res, next) {
    const { email, password } = req.body;

    try {
      const hash = await Utils.encryptPassword(password);

      let user = new User({
        email,
        password: hash,
      });

      user = await user.save();

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    const { password } = req.query;
    const user = req.user;
    const data = {
      password,
      encryptPassword: user.password,
    };

    try {
      await Utils.comparePassword(data);

      res.json({
        user,
      });
    } catch (e) {
      next(e);
    }
  }
}
