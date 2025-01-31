import Category from "../models/Category";

export class CategoryController {
  static async addCategory(req, res, next) {
    try {
      const { title } = req.body;
      const path = req.file.path;
      const data: any = {
        title,
        image_url: path,
      };

      const category = await new Category(data).save();
      res.send(category);
    } catch (e) {
      next(e);
    }
  }
}
