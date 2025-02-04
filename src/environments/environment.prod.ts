import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
  mongoURI: process.env.PROD_MONGODB_URI,
  jwtSecretKey: process.env.PROD_JWT_SECRET_KEY,
};
