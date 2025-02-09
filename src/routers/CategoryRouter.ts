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
    this.router.get("/:id", CategoryController.getCategoryById);
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      new Utils().multer.single("image"),
      CategoryValidators.addCategory(),
      GlobalMiddleware.checkError,
      CategoryController.addCategory
    );
  }

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      GlobalMiddleware.auth,
      new Utils().multer.single("image"),
      CategoryValidators.editCategory(),
      GlobalMiddleware.checkError,
      CategoryController.editCategory
    );
  }

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.auth,
      CategoryController.deleteCategory
    );
  }
}

export default new CategoryRouter().router;
