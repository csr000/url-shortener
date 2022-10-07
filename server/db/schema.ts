import { Schema } from "mongoose";

export const LinkSchema = new Schema({
  url: String,
  genUrl: String,
});
