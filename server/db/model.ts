import {model} from "mongoose";
import { LinkSchema } from "./schema";

export const LinkModel = model("Link", LinkSchema);
export const LinkDB = new LinkModel();