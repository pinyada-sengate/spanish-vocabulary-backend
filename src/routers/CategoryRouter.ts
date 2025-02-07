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

  getRoutes() {
    this.router.get("/getCategories", CategoryController.getCategories);
  }

  postRoutes() {
    this.router.post(
      "/add",
      new Utils().multer.single("image"),
      CategoryValidators.addCategory(),
      GlobalMiddleware.checkError,
      CategoryController.addCategory
    );
  }

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      new Utils().multer.single("image"),
      CategoryValidators.editCategory(),
      GlobalMiddleware.checkError,
      CategoryController.editCategory
    );
  }

  putRoutes() {}

  deleteRoutes() {}
}

export default new CategoryRouter().router;
