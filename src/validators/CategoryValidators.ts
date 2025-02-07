import { body, query } from "express-validator";

export class CategoryValidators {
  static addCategory() {
    return [
      body("title", "Title is requied").isString(),
      body("image", "Image is required").custom((image, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("Category's image is required");
        }
      }),
    ];
  }

  static editCategory() {
    return [
      body("title", "Title is requied").isString(),
      body("image", "Image is required").custom((image, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("Category's image is required");
        }
      }),
    ];
  }
}
