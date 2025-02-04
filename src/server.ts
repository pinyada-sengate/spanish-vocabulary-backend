import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { Utils } from "./utils/Utils";
import { getEnviromentVariables } from "./environments/environment";

import UserRouter from "./routers/UserRouter";
import CategoryRouter from "./routers/CategoryRouter";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.dotenvConfigs();
    this.connectMongoDB();
    this.allowCors();
    this.configureBodyParser();
  }

  dotenvConfigs() {
    Utils.dotenvConfigs();
  }

  connectMongoDB() {
    mongoose.connect(getEnviromentVariables().mongoURI).then(() => {
      console.log("Connected to mongodb");
    });
  }

  configureBodyParser() {
    // parse application/x-www-form-urlencoded
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    // parse application/json
    this.app.use(bodyParser.json());
  }

  allowCors() {
    this.app.use(cors());
  }

  setRoutes() {
    this.app.use("/src/uploads/images", express.static("src/uploads/images"));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/category", CategoryRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something went wrong",
        status_code: errorStatus,
      });
    });
  }
}
