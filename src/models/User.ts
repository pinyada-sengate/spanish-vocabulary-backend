import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, require: true },
  password: { type: String, required: true },
  image_url: { type: String, require: true },
  created_at: { type: Date, require: true, default: new Date() },
  updated_at: { type: Date, require: true, default: new Date() },
});

export default model("users", userSchema);
