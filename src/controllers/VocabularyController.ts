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
}
