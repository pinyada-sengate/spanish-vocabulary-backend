import * as dotenv from "dotenv";
import * as Bcrypt from "bcrypt";

export class Utils {
  static dotenvConfigs() {
    dotenv.config({ path: ".env" });
  }

  static encryptPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }
}
