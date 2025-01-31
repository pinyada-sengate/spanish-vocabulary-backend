import { body, query } from "express-validator";

export class CategoryValidators {
  static addCategory() {
    return [
      body("title", "Name is requied").isString(),
      body("categoryImages", "Image is required").custom((image, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("Category's image is required");
        }
      }),
    ];
  }
}
