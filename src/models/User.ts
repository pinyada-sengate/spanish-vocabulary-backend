import * as mongoose from "mongoose";
import {model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, require: true, default: new Date() },
    updated_at: { type: Date, require: true, default: new Date() },
})