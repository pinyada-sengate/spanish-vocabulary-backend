import { Environment } from "./environment";

export const ProdEnvironment: Environment = {
    mongoURI: process.env.PROD_MONGODB_URI,
};