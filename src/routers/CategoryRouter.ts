import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryValidators } from "../validators/CategoryValidators";
import { Utils } from "../utils/Utils";

class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/add",
      new Utils().multer.single("image"),
      CategoryValidators.addCategory(),
      GlobalMiddleware.checkError,
      CategoryController.addCategory
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new CategoryRouter().router;
