import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { VocabularyController } from "../controllers/VocabularyController";
import { VocabularyValidators } from "../validators/VocabularyValidators";
import { Utils } from "../utils/Utils";

class VocabularyRouter {
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
      VocabularyValidators.addVocabulary(),
      GlobalMiddleware.checkError,
      VocabularyController.addVocabulary
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new VocabularyRouter().router;
