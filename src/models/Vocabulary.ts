import * as mongoose from "mongoose";
import { model, Schema } from "mongoose";

const vocabularySchema = new mongoose.Schema({
  categoryIds: [
    { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  ],
  image: { type: String, require: true },
  es: { type: String, required: true },
  en: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("vocabularies", vocabularySchema);
