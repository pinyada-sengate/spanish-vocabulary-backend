import * as mongoose from "mongoose";
import { model } from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, require: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("categories", categorySchema);
