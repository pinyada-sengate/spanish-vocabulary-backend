import Category from "../models/Category";

export class CategoryController {
  static async addCategory(req, res, next) {
    try {
      const { title } = req.body;
      const path = req.file.path;
      const data: any = {
        title,
        image: path,
      };

      const category = await new Category(data).save();
      res.send(category);
    } catch (e) {
      next(e);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.json({
        categories,
      });
    } catch (e) {
      next(e);
    }
  }

  static async editCategory(req, res, next) {
    const { title, image } = req.body;
    const id = req.params.id;
    try {
      const category = await Category.findOne(
        {
          _id: id,
        },
        {
          title,
          image,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );

      if (category) {
        res.json({
          category,
        });
      } else {
        throw new Error("Category does not exist");
      }
    } catch (e) {
      next(e);
    }
  }
}
