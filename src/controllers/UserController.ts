import User from "../models/User";
import { Utils } from "../utils/Utils";
import { Jwt } from "../utils/Jwt";

export class UserController {
  static async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;

      const file = req.file;
      const hashPassword = await Utils.encryptPassword(password);

      let user = new User({
        name,
        email,
        password: hashPassword,
        image: file ? file.path : undefined,
      });

      user = await user.save();

      const payload = {
        userId: user.id,
        email: user.email,
      };
      const token = Jwt.jwtSign(payload);

      res.json({
        userId: user.id,
        email: user.email,
        token,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    const { password } = req.body;
    const user = req.user;
    const data = {
      password,
      encryptPassword: user.password,
    };

    try {
      await Utils.comparePassword(data);

      const payload = {
        userId: user.id,
        email: user.email,
      };

      const token = Jwt.jwtSign(payload);

      res.json({
        user_id: user.id,
        email: user.email,
        token,
      });
    } catch (e) {
      next(e);
    }
  }
}
