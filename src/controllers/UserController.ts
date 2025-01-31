import User from "../models/User";
import { Utils } from "../utils/Utils";

export class UserController {
  static async signup(req, res, next) {
    const { username, password } = req.body;

    try {
      const hash = await Utils.encryptPassword(password);

      let user = new User({
        username,
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

  static async login(req, res, next) {}
}
