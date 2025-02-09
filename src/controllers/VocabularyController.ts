import Vocabulary from "../models/Vocabulary";

export class VocabularyController {
  static async addVocabulary(req, res, next) {
    try {
      const { es, en, categoryId } = req.body;
      const path = req.file.path;
      const data: any = {
        category_id: categoryId,
        es,
        en,
        image: path,
      };

      const vocabulary = await new Vocabulary(data).save();
      res.json({
        vocabulary,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getVocabulariesByCategoryId(req, res, next) {
    const { categoryId } = req.params;

    try {
      const vocabularies = await Vocabulary.find({
        category_id: categoryId,
      });

      res.json({
        vocabularies,
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteVocabulary(req, res, next) {
    const { id } = req.params;

    try {
      await Vocabulary.findOneAndDelete({
        _id: id,
      });
      res.json({
        success: true,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getVocabularyById(req, res, next) {
    try {
      const { id } = req.params;
      const vocabulary = await Vocabulary.findById(id);

      if (vocabulary) {
        res.json({
          vocabulary,
        });
      } else {
        throw new Error("Vocabulary does not exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async editVocabulary(req, res, next) {
    try {
      const { es, en } = req.body;
      const { id } = req.params;
      const file = req.file;

      const vocabulary = await Vocabulary.findOneAndUpdate(
        {
          _id: id,
        },
        {
          es,
          en,
          image: file ? file.path : undefined,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );

      if (vocabulary) {
        res.json({
          vocabulary,
        });
      } else {
        throw new Error("Vocabulary does not exist");
      }
    } catch (e) {
      next(e);
    }
  }
}
