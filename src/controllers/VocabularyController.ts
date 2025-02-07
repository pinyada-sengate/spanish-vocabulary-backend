import Vocabulary from "../models/Vocabulary";

export class VocabularyController {
  static async addVocabulary(req, res, next) {
    try {
      const { es, en, categoryIds } = req.body;
      const path = req.file.path;
      const data: any = {
        categoryIds,
        es,
        en,
        image: path,
      };

      const vocabulary = await new Vocabulary(data).save();
      res.send(vocabulary);
    } catch (e) {
      next(e);
    }
  }

  static async getVocabulariesByCategoryId(req, res, next) {
    const { categoryId } = req.params;

    try {
      const vocabularies = await Vocabulary.find({
        categoryIds: categoryId,
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
}
