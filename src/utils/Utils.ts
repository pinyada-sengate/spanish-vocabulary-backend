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

  static comparePassword(data: { password: string; encryptPassword: string }) {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encryptPassword, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("User and password does not match"));
        } else {
          resolve(same);
        }
      });
    });
  }
}
