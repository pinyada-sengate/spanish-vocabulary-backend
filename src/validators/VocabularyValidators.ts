import { body } from "express-validator";
import Category from "../models/Category";

export class VocabularyValidators {
  static addVocabulary() {
    return [
      body("es", "Spanish vocabulary is requied").isString(),
      body("en", "English vocabulary is requied").isString(),
      body("categoryIds", "Category ids is requied")
        .isArray()
        .custom(async (categoryIds, { req }) => {
          try {
            const categories = await Category.find({
              _id: { $in: categoryIds },
            });
            if (categories.length === categoryIds.length) {
              return true;
            } else {
              throw new Error("Category id is not exists");
            }
          } catch (e) {
            throw new Error(e);
          }
        }),
      body("image", "Image is required").custom((image, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("Vocabulary's image is required");
        }
      }),
    ];
  }

  static editVocabulary() {
    return [
      body("es", "Spanish vocabulary is requied").isString(),
      body("en", "English vocabulary is requied").isString(),
    ];
  }
}
