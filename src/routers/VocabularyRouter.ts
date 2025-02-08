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

  getRoutes() {
    this.router.get(
      "/:categoryId",
      VocabularyController.getVocabulariesByCategoryId
    );
    this.router.get(
      "/getVocabularyById/:id",
      VocabularyController.getVocabularyById
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.auth,
      new Utils().multer.single("image"),
      VocabularyValidators.addVocabulary(),
      GlobalMiddleware.checkError,
      VocabularyController.addVocabulary
    );
  }

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      GlobalMiddleware.auth,
      new Utils().multer.single("image"),
      VocabularyValidators.editVocabulary(),
      GlobalMiddleware.checkError,
      VocabularyController.editVocabulary
    );
  }

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.auth,
      VocabularyController.deleteVocabulary
    );
  }
}

export default new VocabularyRouter().router;
