import { DevEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";

export interface Environment {
  
}

export function getEnviromentVariables() {
  if (process.env.NODE_ENV === "production") {
    return ProdEnvironment;
  }

  return DevEnvironment;
}