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
    try {
      const { title } = req.body;
      const { id } = req.params;
      const file = req.file;

      const category = await Category.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
          image: file ? file.path : undefined,
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

  static async getCategoryById(req, res, next) {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);

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
