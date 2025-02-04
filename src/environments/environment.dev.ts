import { Utils } from "../utils/Utils";
import { Environment } from "./environment";

Utils.dotenvConfigs();

export const DevEnvironment: Environment = {
  mongoURI: process.env.DEV_MONGODB_URI,
  jwtSecretKey: process.env.DEV_JWT_SECRET_KEY,
};
